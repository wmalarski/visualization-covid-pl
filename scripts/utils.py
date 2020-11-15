import datetime
from typing import Dict

import pandas as pd


def to_datatime_with_ignore(series: pd.Series) -> pd.Series:
    return series.apply(lambda x: x if isinstance(x, datetime.datetime) else None)


def to_numeric_df(df: pd.DataFrame, *, errors: str) -> pd.DataFrame:
    return df.apply(lambda x: pd.to_numeric(x, errors=errors))


def extract_region_rows(data: pd.DataFrame, *, from_row: int, to_row: int) -> pd.DataFrame:
    datatimes = to_datatime_with_ignore(data.iloc[from_row])
    time_index = datatimes[~pd.isna(datatimes)]
    columns = [region.lower() for region in data.iloc[from_row + 1:to_row, 0]]
    stacked = pd.DataFrame(
        data=data[time_index.index].iloc[from_row + 1: to_row].T.values,
        index=time_index,
        columns=columns,
        dtype=int,
    ).stack()
    return stacked


def extract_columns(data: pd.DataFrame, *, date_column: int, columns: Dict[str, int]) -> pd.DataFrame:
    headers, column_indexes = zip(*columns.items())
    datatimes = to_datatime_with_ignore(data.iloc[:, date_column])
    time_index = datatimes[~pd.isna(datatimes)]
    selected_data = data.iloc[:, list(column_indexes)].loc[time_index.index]
    numeric_data = to_numeric_df(selected_data, errors="coerce")
    return pd.DataFrame(numeric_data.values, index=time_index, columns=headers)
