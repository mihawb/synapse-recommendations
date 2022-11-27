import logging
import azure.functions as func
import numpy as np
import pandas as pd
import os
import json
import pyodbc
import random


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    connection_string = os.getenv('FUNC_TO_DB_CONNECTION_STRING')
    token = req.params.get('token')
    ids_for_query = list(map(lambda id: f"'{id}'", req.params.get('ids').split(',')))
    ids_for_query_concat = ','.join(ids_for_query)

    rows = []
    with pyodbc.connect(connection_string) as conn:
        with conn.cursor() as cursor:
            cursor.execute(f"SELECT * FROM SPOTIFY_DATA WHERE TRACK_ID IN ({ids_for_query_concat})")
            row = cursor.fetchone()
            while row:
                rows.append(list(row))
                row = cursor.fetchone()

    cols = ['track_id', 'artists', 'album_name', 'track_name', 'popularity', 'duration_ms', 'explicitlang', 'danceability', 'energy', 'musickey', 'loudness', 'mode', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'time_signature', 'track_genere']
    queried_songs = pd.DataFrame(rows, columns=cols)

    cechy_ilosc = ['popularity', 'duration_ms', 'danceability', 'energy', 'loudness', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo']
    for_calc = queried_songs[cechy_ilosc]

    avg = for_calc.mean()
    std = for_calc.std()
    mini = avg - std*0.3
    maxi = avg + std*0.3
    param_for_query = pd.DataFrame([mini, maxi], columns=cechy_ilosc)

    # cechy_for_query = ['loudness', 'speechiness', 'acousticness', 'instrumentalness']
    cechy_for_query = random.choices(cechy_ilosc, k=4)

    def getRestParams(lst, df):
        ps = []
        if len(lst) != 0: ps.append('')
        for c in lst:
            p = f'{c} BETWEEN {df.loc[0, c]} AND {df.loc[1, c]}'
            ps.append(p)

        return ' AND '.join(ps)

    query = f'''SELECT TOP 50 TRACK_ID FROM SPOTIFY_DATA
WHERE {cechy_for_query[0]} BETWEEN {param_for_query.loc[0, cechy_for_query[0]]} AND {param_for_query.loc[1, cechy_for_query[0]]}
{getRestParams(cechy_for_query[1:], param_for_query)}
AND TRACK_ID NOT IN ({ids_for_query_concat})
'''

    rows = []
    with pyodbc.connect(connection_string) as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            row = cursor.fetchone()
            while row:
                rows.append(list(row))
                row = cursor.fetchone()

    rows = list(map(lambda r: r[0], rows))
    res = json.dumps(rows)

    if res == []:
        return func.HttpResponse(json.dumps({'error': 'nic nie znaleziono'}), status_code=200)
    else: 
        return func.HttpResponse(res, status_code=200)