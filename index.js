const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
"https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");

// initially get fav movies
getMovies(APIURL);
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.results);
}
function showMovies(movies) {
    // clear main
    main.innerHTML = "";
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview, release_date } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <img src="${IMGPATH + poster_path}" alt="${title}"
        />
        <div class="movie-info">
        <span class="${getClassByRate(vote_average)}">Rating ${vote_average}</span>
        <h3>${title}</h3>
        <span>${release_date}</span>
        </div>
        <div class="overview">
        <h3>Overview:</h3>
        ${overview}
        </div>
        `;
        main.appendChild(movieEl);
    });
}
function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}
form.addEventListener("submit", (e) => {
    
    e.preventDefault();
    const searchTerm = search.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    let apiUrl = APIURL;

    if (startDate && endDate) {
        apiUrl += `&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`;
    }

    if (searchTerm) {
        apiUrl = SEARCHAPI + searchTerm;
    }

    getMovies(apiUrl);
    search.value = "";

   }
);