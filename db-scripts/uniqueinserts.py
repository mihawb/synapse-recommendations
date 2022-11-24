if __name__ == '__main__':
	ids = []
	query_count = 0
	divide_by = 10000
	file_num = 0

	whand = open(f'distinctqueries{file_num}.sql', 'wb')
	with open('inserts-concat.txt', 'rb') as fhand:
		for query in fhand:
			id = query[266:288]

			if id not in ids:
				query_count += 1
				ids.append(id)
				whand.write(query)

			if query_count % divide_by == 0:
				whand.close()
				file_num = query_count // divide_by
				whand = open(f'distinctqueries{file_num}.sql', 'wb')

	whand.close()