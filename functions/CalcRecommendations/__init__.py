import logging
import azure.functions as func
import numpy as np
import os
import json
import pyodbc

import polars as pl

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from sklearn.cluster import KMeans
from sklearn.neighbors import NearestNeighbors


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    connection_string = os.getenv('FUNC_TO_DB_CONNECTION_STRING')
    token = req.params.get('token')
    cols = (
        'track_id', 'artists', 'album_name', 'track_name', 'popularity','duration_ms',
        'explicitlang', 'danceability', 'energy', 'musickey', 'loudness', 'mode',
        'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence',
        'tempo', 'time_signature', 'track_genre'
    )
    numeric_columns = (
	    'popularity', 'danceability', 'energy', 'musickey', 'loudness', 'mode',
        'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo'
    )

    ids_for_query = list(map(lambda id: f"'{id}'", req.params.get('ids').split(',')))
    ids_for_query_concat = ','.join(ids_for_query)

    conn = pyodbc.connect(connection_string)
    cursor = conn.cursor()

    cursor.execute(f"SELECT * FROM SONGS_INFO WHERE track_id IN ({ids_for_query_concat})")
    rows_queried = cursor.fetchall()
    rows_queried_dict = dict()
    for i, col in enumerate(cols):
        rows_queried_dict[col] = [row[i] for row in rows_queried]
    queried_songs = pl.DataFrame(rows_queried_dict, schema=cols)

    cursor.execute(f"SELECT * FROM SONGS_INFO WHERE track_id IN ({ids_for_query_concat})")
    rows_queried = cursor.fetchall()
    rows_queried_dict = dict()
    for i, col in enumerate(cols):
            rows_queried_dict[col] = [row[i] for row in rows_queried]
    queried_songs = pl.DataFrame(rows_queried_dict, schema=cols)

    cursor.execute(f"SELECT DISTINCT track_genre FROM SONGS_INFO")
    rows_genres = [genre[0] for genre in cursor.fetchall()]
    all_genres = pl.DataFrame({'track_genre': rows_genres})

    queried_genres = queried_songs[:,'track_genre']
    queried_genres = pl.concat((
            queried_genres,
            all_genres.filter(~pl.col('track_genre').is_in(queried_genres['track_genre']))
    ))

    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(queried_genres.to_numpy().flatten())

    importance = np.zeros((1, tfidf_matrix.shape[0]))
    for i in range(0, queried_songs.shape[0]):
            ans = cosine_similarity(tfidf_matrix[i:i+1], tfidf_matrix)
            importance += ans

    best_rec_genres = pl.DataFrame({
            'track_genre': queried_genres['track_genre'],
            'importance': importance.T.flatten()
    }).unique()

    best_rec_genres = best_rec_genres.sort('importance', descending=True)
    best_rec_genres = best_rec_genres.filter(pl.col('importance') >= 0.8)

    best_rec_genres_concat = ','.join([f"'{genre}'" for genre in best_rec_genres['track_genre']])
    cursor.execute(f"SELECT * FROM SONGS_INFO WHERE track_genre IN ({best_rec_genres_concat})")
    rows_relevant_records = cursor.fetchall()
    relevant_records_dict = dict()
    for i, col in enumerate(cols):
            relevant_records_dict[col] = [row[i] for row in rows_relevant_records]
    relevant_records = pl.DataFrame(relevant_records_dict, schema=cols)
    relevant_records = relevant_records.filter(~pl.col('track_id').is_in(queried_songs['track_id']))

    relevant_records = relevant_records.with_columns(
        popularity = pl.col('popularity') / 100,
        musickey = pl.col('musickey') / 11,
        loudness = pl.col('loudness') / 60,
        tempo = pl.col('tempo') / 250
    )

    queried_songs = queried_songs.with_columns(
        popularity = pl.col('popularity') / 100,
        musickey = pl.col('musickey') / 11,
        loudness = pl.col('loudness') / 60,
        tempo = pl.col('tempo') / 250
    )

    N = queried_songs.shape[0] * 2 // 5
    kmeans = KMeans(n_clusters=N, n_init=10)
    kmeans.fit(queried_songs.select(numeric_columns).to_numpy())

    songs_centroids = pl.DataFrame(kmeans.cluster_centers_, schema=numeric_columns)

    songs_centroids = songs_centroids.with_columns(
        popularity = pl.col('popularity') * 100,
        musickey = pl.col('musickey') * 11,
        loudness = pl.col('loudness') * 60,
        tempo = pl.col('tempo') * 250
    )

    neigh = NearestNeighbors(n_neighbors=3)
    neigh.fit(relevant_records.select(numeric_columns).to_numpy())

    distances, indices = neigh.kneighbors(queried_songs.select(numeric_columns).to_numpy())

    distances = distances.flatten()
    indices = indices.flatten()

    proposed = pl.DataFrame({
        'distances': distances,
        'indices': indices
    })

    proposed = proposed.sort('distances', descending=True)
    recommendations = relevant_records[proposed['indices'].head(30),:]
    res = json.dumps(recommendations['track_id'].to_list())

    if res == []:
        return func.HttpResponse(json.dumps({'error': 'nic nie znaleziono'}), status_code=200)
    else: 
        return func.HttpResponse(res, status_code=200)