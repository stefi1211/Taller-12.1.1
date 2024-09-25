let movies = [];

fetch('https://japceibal.github.io/japflix_api/movies-data.json')
  .then(response => response.json())
  .then(data => {
    movies = data;
  });

document.getElementById('btnBuscar').addEventListener('click', () => {
  const query = document.getElementById('inputBuscar').value.toLowerCase();
  const filteredMovies = movies.filter(movie => {
    return movie.title.toLowerCase().includes(query) || 
           movie.genres.some(genre => genre.name.toLowerCase().includes(query)) || 
           movie.tagline.toLowerCase().includes(query) || 
           movie.overview.toLowerCase().includes(query);
  });

  const lista = document.getElementById('lista');
  lista.innerHTML = '';
  filteredMovies.forEach(movie => {
    const li = document.createElement('li');
    li.className = 'list-group-item text-white bg-dark';
    li.innerHTML = `${movie.title} <br> ${movie.tagline} <br> ${getStars(movie.vote_average)}`;
    li.addEventListener('click', () => mostrarDetalles(movie));
    lista.appendChild(li);
  });
});

function getStars(vote) {
  const stars = Math.round(vote / 2);
  let starsHTML = '';
  for (let i = 1; i <= 5; i++) {
    starsHTML += i <= stars ? '<i class="fa fa-star" style="color: gold;"></i>' : '<i class="fa fa-star" style="color: gray;"></i>';
  }
  return starsHTML;
}

function mostrarDetalles(movie) {
  document.getElementById('offcanvasLabel').textContent = movie.title;
  document.getElementById('movieOverview').textContent = movie.overview;

  const movieGenres = document.getElementById('movieGenres');
  movieGenres.innerHTML = '';
  movie.genres.forEach(genre => {
    const li = document.createElement('li');
    li.textContent = genre.name;
    movieGenres.appendChild(li);
  });

  const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasDetails'));
  offcanvas.show();
}
