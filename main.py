from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import json
from pathlib import Path

app = FastAPI()

# --- CORS ---
origins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CONFIGURATION DES CHEMINS ---

# 1. Repère le dossier où est main.py (la racine)
BASE_DIR = Path(__file__).parent

# 2. Définit le chemin PHYSIQUE vers les images (dans le sous-dossier backend)
# On descend dans "backend" puis dans "images"
IMAGES_DIR = BASE_DIR / "backend" / "images"

# 3. Monte le dossier sur l'URL "/images"
# URL navigateur : http://localhost:8000/images/film.jpg
# Chemin disque  : root/backend/images/film.jpg
app.mount("/images", StaticFiles(directory=IMAGES_DIR), name="images")

DATA_PATH = BASE_DIR / "movies.json"

# --- ROUTES ---

@app.get("/movies")
def get_movies(limit: int = Query(None, ge=1)):
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            movies = json.load(f)
    except FileNotFoundError:
        return {"error": "movies.json introuvable"}

    if limit is None or limit > len(movies):
        return movies
    return movies[:limit]