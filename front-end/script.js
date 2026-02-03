async function loadMovies(limit = 5) {
  const res = await fetch(`http://127.0.0.1:8000/movies?limit=${limit}`);
  const movies = await res.json();
  return movies;
}

const API_BASE = "http://127.0.0.1:8000";


async function displayMovies() {
  const movies = await loadMovies(5);
  const container = document.getElementById("movies");

  container.innerHTML = "";
  
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
  
    const image = movie.image_url
      ? `<img src="${API_BASE + movie.image_url}" alt="${movie.title}">`
      : "";
  
    card.innerHTML = `
      ${image}
      <h2>${movie.title}</h2>
      <p><strong>Année :</strong> ${movie.year}</p>
      <p><strong>Réalisateur :</strong> ${movie.director}</p>
      <p><strong>Genre :</strong> ${movie.genre}</p>
    `;
  
    container.appendChild(card);
  });
  
}

displayMovies();

