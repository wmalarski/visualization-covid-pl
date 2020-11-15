from pathlib import Path

import click

from .api import export_to_database


@click.command()
@click.option('--excel', type=click.Path(exists=True, dir_okay=False), help='Path to input excel file.')
def prepare(excel: str) -> None:
    export_to_database(excel_path=Path(excel))


