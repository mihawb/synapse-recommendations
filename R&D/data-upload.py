# bcp and import wizard both suck ass

import pandas as pd
import json, pyodbc, time
from config import DB_CONNECTION_STRING


def truncate_artists(name: str) -> str:
    trunc_idx = name.find(';')
    return name[: trunc_idx if trunc_idx >= 0 else len(name)]


def main():	
	# DB connection
	conn = pyodbc.connect(DB_CONNECTION_STRING)
	cursor = conn.cursor()

	# existing records to be excluded from upload
	cursor.execute('SELECT track_id FROM SONGS_INFO')
	rows = cursor.fetchall()
	cursor.commit()

	# load songs from file
	songs = pd.read_csv('spotify-dataset-combined.csv')

	# excluding existing records
	existing_records = list(map(lambda t: t[0], rows))
	songs = songs[~songs['track_id'].isin(existing_records)]

	# parsing song set for upload
	songs = songs.dropna(axis=0)
	songs = songs.drop_duplicates(subset='track_id', keep='first')
	songs.artists = songs.artists.apply(truncate_artists)

	columns = ','.join(songs.columns)
	dummies = ','.join(['?'] * len(songs.columns))

	# partitioned upload
	for i, song in enumerate(songs.itertuples()):
		cursor.execute(f'INSERT INTO SONGS_INFO ({columns}) VALUES ({dummies})', song[1:])
		if (i % 1000 == 0):
			cursor.commit()
			print(f'wrzucono {i} / {(shape := songs.shape[0])} wierszy ({(i / shape * 100):.2f}%)')
			time.sleep(3) 

	cursor.commit()
	conn.close()


if __name__ == '__main__':
	main()