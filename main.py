from fastapi import FastAPI, Query
import json
from pathlib import Path

app = FastAPI()

DATA_PATH = Path(__file__).parent / "movies.json"

@app.get("/hello")
def hello():
    return {"message": "Hello World"}

@app.get("/movies")
def get_movies(limit: int = Query(None, ge=1)): # ge1 : pour s'assurer que limit >=1
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            movies = json.load(f)
    except FileNotFoundError:
        return {"error": "movies.json introuvable"}
    if limit is None or limit > len(movies):
        return movies
    return movies[:limit] 

