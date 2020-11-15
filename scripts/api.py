import datetime
from pathlib import Path
from typing import Dict

import pandas as pd
from dotenv import load_dotenv, find_dotenv
from pymongo.database import Database

from .utils import extract_region_rows, extract_columns

load_dotenv(find_dotenv(".env.local"))


def get_region_summary_df(xls: pd.ExcelFile) -> pd.DataFrame:
    region_summary_original = pd.read_excel(xls, 'Wzrost w województwach')
    return pd.DataFrame({
        "cases": extract_region_rows(region_summary_original, from_row=6, to_row=23),
        "deaths": extract_region_rows(region_summary_original, from_row=49, to_row=66),
        "recovers": extract_region_rows(region_summary_original, from_row=89, to_row=106)
    }).reset_index().rename(columns={6: "date", "level_1": "region"})


def get_tests_df(xls: pd.ExcelFile) -> pd.DataFrame:
    tests_original = pd.read_excel(xls, "Testy")
    return extract_columns(tests_original, date_column=1, columns={
        "sumPeopleTested": 2,
        "sumTests": 4,
        "ordersPoz": 7,
        "sumPositive": 9,
        "sumNegativeAgainPositive": 15,
    }).reset_index().rename(columns={"Unnamed: 1": "date"})


def get_region_tests_df(xls: pd.ExcelFile) -> pd.DataFrame:
    region_tests_original = pd.read_excel(xls, " Testy w województwach")
    return pd.DataFrame({
        "sumTests": extract_region_rows(region_tests_original, from_row=1, to_row=18),
        "sumPositive": extract_region_rows(region_tests_original, from_row=41, to_row=58),
    }).reset_index().rename(columns={"level_0": "date", "level_1": "region"})


def get_pandemic_df(xls: pd.ExcelFile) -> pd.DataFrame:
    pandemic_original = pd.read_excel(xls, "Sytuacja epidemiologiczna")
    return extract_columns(pandemic_original, date_column=0, columns={
        "hospitalized": 1,
        "bedsCount": 4,
        "respiratorsUsed": 6,
        "respiratorsAll": 9,
        "quarantine": 13,
        "inspection": 14,
    }).reset_index().rename(columns={"Unnamed: 0": "date"})


def get_region_pandemic_df(xls: pd.ExcelFile) -> pd.DataFrame:
    region_pandemic_original = pd.read_excel(xls, "Sytuacja epidemiologiczna w woj")
    region_dfs: Dict[str, pd.DataFrame] = {}
    for region_index in range(16):
        region_first_column = region_index * 8 + 1
        region_columns = [0] + list(range(region_first_column, region_first_column + 8))
        selected_region = region_pandemic_original.iloc[:, region_columns]
        selected_region_name = selected_region.iloc[0, 1].lower()
        region_dfs[selected_region_name] = extract_columns(selected_region, date_column=0, columns={
            "hospitalized": 1,
            "bedsCount": 3,
            "respiratorsUsed": 5,
            "respiratorsAll": 7,
        })
    return pd.concat(region_dfs).reset_index().rename(columns={"level_0": "region", "Unnamed: 0": "date"})


def get_population_df(xls: pd.ExcelFile) -> pd.DataFrame:
    population_original = pd.read_excel(xls, "Aktualna sytuacja w Polsce")
    regions = [region.lower() for region in population_original.iloc[1:17, 1]]
    population = population_original.iloc[1:17, 12].astype(int)
    return pd.DataFrame({"region": regions, "population": population})


def export_to_database(excel_path: Path, db: Database) -> None:
    xls = pd.ExcelFile(excel_path)

    dict_data = {
        "date": datetime.datetime.utcnow(),
        "summary": get_region_summary_df(xls).to_dict("records"),
        "tests": get_tests_df(xls).to_dict("records"),
        "regionTests": get_region_tests_df(xls).to_dict("records"),
        "pandemic": get_pandemic_df(xls).to_dict("records"),
        "regionPandemic": get_region_pandemic_df(xls).to_dict("records"),
        "population": get_population_df(xls).to_dict("records"),
    }
    reports_collection = db.reports
    reports_collection.insert_one(dict_data)
