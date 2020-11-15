import os
from pathlib import Path

import click
from pymongo import MongoClient

from .api import export_to_database


@click.command()
@click.option('--excel', type=click.Path(exists=True, dir_okay=False), help='Path to input excel file.')
def prepare(excel: str) -> None:
    connection_string = os.environ.get("MONGO_DB_CONNECTION")
    db_name = os.environ.get("MONGO_DB_NAME")
    if connection_string is None or db_name is None:
        return

    client = MongoClient(connection_string)
    try:
        db = client[db_name]
        export_to_database(excel_path=Path(excel), db=db)
    finally:
        client.close()


