// Fechando o modal
const $background = document.getElementById('modal-background');
const $modalConteiner = document.getElementById('modal-conteiner');

let currentMovie = {};

$overlay.classList.add('overlay');

const backgroundClickHandler = () => {
    $overlay.classList.remove('open');
};

function addCurrentMovieToList() {
    if (isMovieAlreadyOnList(currentMovie.imdbID)) {
        notie.alert({ type: 'error', text: 'Filme já está na sua lista' });
        return;
    }
    addToList(currentMovie);
    uptadeUI(currentMovie);
    updateLocalStorage();
    backgroundClickHandler();
}

function createModal(data) {
    currentMovie = data;

    $modalConteiner.innerHTML = `
      <h2 id="movie-title">${data.Title} - ${data.Year}</h2>
      <section id="modal-body">
        <img id="movie-poster" src="${data.Poster}" alt="Poster do filme" />
        <div id="movie-info">
          <h3 id="movie-plot">${data.Plot}</h3>
          <div id="movie-cast">
            <h4>Elenco:</h4>
            <h5 id="movie-actors">${data.actors}</h5>
          </div>
          <div id="movie-genre">
            <h4>Gênero:</h4>
            <h5>${data.Genre} </h5>
          </div>
        </div>
      </section>
      <section id="modal-footer">
        <button id="add-to-list" onclick="{addCurrentMovieToList()}" >Adicionar à lista</button>
      </section>`;
}

$background.addEventListener('click', backgroundClickHandler);
