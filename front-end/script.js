const API_BASE = "http://127.0.0.1:8000";

async function loadMovies(limit = 5) {
  try {
    const res = await fetch(`${API_BASE}/movies?limit=${limit}`);
    if (!res.ok) {
      throw new Error(`Erreur HTTP: ${res.status}`);
    }
    const movies = await res.json();
    return movies;
  } catch (error) {
    console.error("Erreur lors du chargement des films:", error);
    return [];
  }
}

async function displayMovies(limit = 5) {
  const movies = await loadMovies(limit);
  const container = document.getElementById("movies");

  container.innerHTML = "";
  
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    
    // Gestion des images (certains films n'ont pas d'image)
    let imageHTML = "";
    if (movie.image_url) {
      imageHTML = `<img src="${API_BASE + movie.image_url}" alt="${movie.title}" class="movie-image">`;
    } else {
      // Image par défaut si pas d'image_url
      imageHTML = `<div class="no-image">Pas d'image disponible</div>`;
    }

    card.innerHTML = `
      <div class="image-container">
        ${imageHTML}
      </div>
      <div class="movie-info">
        <h2>${movie.title}</h2>
        <p><strong>Année :</strong> ${movie.year}</p>
        <p><strong>Réalisateur :</strong> ${movie.director}</p>
        <p><strong>Genre :</strong> ${movie.genre}</p>
      </div>
    `;
    
    container.appendChild(card);
  });
}

// Initialiser l'affichage avec 6 films
displayMovies(6);