import logging
import azure.functions as func
import os
import pyodbc


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    connection_string = os.getenv('FUNC_TO_DB_CONNECTION_STRING')
    rows = []
    with pyodbc.connect(connection_string) as conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM SPOTIFY_DATA WHERE ARTISTS='Drake'")
            row = cursor.fetchone()
            while row:
                rows.append(row)
                row = cursor.fetchone()

    if rows == []:
        return func.HttpResponse('nic nie znaleziono', status_code=200)
    else: 
        return func.HttpResponse(str(rows), status_code=200)