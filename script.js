// Abrindo o modal
const $searchButton = document.getElementById('search');
const $overlay = document.getElementById('modal-overlay');
const $movieName = document.getElementById('movie-name');
const $movieYear = document.getElementById('movie-year');
const $movieListElement = document.getElementById('movie-list');
let movieList = JSON.parse(localStorage.getItem('movie-List')) ?? []
async function searchButtonClickHandler() {
    try {
        let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameGenerator()}${movieYearGenerator()}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.Error) {
            throw new Error('Filme não encontrado');
        }
        createModal(data);
        $overlay.classList.add('open');
    } catch (error) {
        notie.alert({
            type: 'error',
            text: error.message,
        });
    }
}
function movieNameGenerator() {
    if ($movieName.value === '') {
        throw new Error('O nome do filme deve ser informado');
    }
    return $movieName.value.split(' ').join('+');
}
function movieYearGenerator() {
    if ($movieYear.value === '') {
        return '';
    }
    if (
        Number.isNaN(Number($movieYear.value)) ||
        $movieYear.value.length !== 4
    ) {
        throw new Error('Ano do filme inválido');
    }
    return `&y=${$movieYear.value}`;
}

function addToList(movieObject) {
    movieList.push(movieObject);
}

function isMovieAlreadyOnList(id) {
    function doesThisIdBelongToThisMovie(movieObject) {
        return movieObject.imdbID === id;
    }
    return Boolean(movieList.find(doesThisIdBelongToThisMovie));
}

function uptadeUI(movieObject) {
    $movieListElement.innerHTML += `
    <article id="movie-card-${movieObject.imdbID}">
        <img
            src="${movieObject.Poster}"
            alt="Poster de ${movieObject.title}"
        />
        <button onclick="{removeMovieFromList('${movieObject.imdbID}')}" class="remove-button">
            <i class="bi bi-trash"></i> Remover
        </button>
    </article>
    `;
}

function removeMovieFromList(id) {
    notie.confirm({
        text: 'Deseja remover o filme da sua lista?',
        submitText: 'Yes',
        cancelText: 'No',
        submitCallback: function removeMovie() {
            movieList = movieList.filter((movie) => movie.imdbID !== id);
            document.getElementById(`movie-card-${id}`).remove();
            updateLocalStorage();
        }
    })

}

function updateLocalStorage() {
    localStorage.setItem('movie-List', JSON.stringify(movieList));
}

for(const movieInfo of movieList) {
    uptadeUI(movieInfo)
}

$searchButton.addEventListener('click', searchButtonClickHandler);
