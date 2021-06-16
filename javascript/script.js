const showSearch = document.querySelector("#searchForm");
const searchSubmit = document.querySelector("#searchSubmit");
const searchInput = document.querySelector("#searchInput");
const displaySearches = document.querySelector("#displaySearches");
const movieDetailsContainer = document.querySelector("#movieDetailsContainer");
const filmMode = document.querySelector("#filmMode");
const movieSearch = document.querySelector("#movieSearch");
const movies = document.querySelector("#movies");
const movieInput = document.querySelector("#movieInput")
const tvShows = document.querySelector("#tvShows");
const logo = document.querySelector("#logo")
const search = document.querySelector("#search");
const hr = document.querySelector("hr");
const status = document.querySelector("#status");
const displayDetails = document.querySelector("#displayDetails");

let data = [];

showSearch.addEventListener("submit", async function (e) {
        e.preventDefault();
        const searchValue = showSearch.elements.searchInput.value;
        
        if(searchValue.length <= 1) {
            status.style.display = "block";
        } else {
            status.style.display = "none"

            deleteItems(data);
            data = await fetchShowsAPI(searchValue);
            displayShow(data);
            searchInput.value = "";
    
            console.dir(data);
        }
});


movieSearch.addEventListener("submit", async function (e) {
        e.preventDefault();
        const searchValue = movieSearch.elements.movieInput.value;

        if(searchValue.length <= 1) {
            status.style.display = "block";
        } else {
            status.style.display = "none"
            
            deleteItems(data);
            data = await fetchShowsAPI(searchValue);
            displayMovie(data);
            movieInput.value = "";
    
            console.dir(data);
        }

        
});


filmMode.addEventListener("input", async function(e) {
        
        if (this.value == "movie") {
            tvShows.style.display = "none";
            movies.style.display = "block";
            deleteItems(data);

        } 
        else if (this.value == "tvshow") {
            movies.style.display = "none";
            tvShows.style.display = "block";
            deleteItems(data);
        }
})
   



const fetchShowsAPI = async (value) =>  {
    if(filmMode.value == "movie") {
        const config = {params: {apikey : "37697e59", r: "json", s: value}};
        const res = await axios.get("https://www.omdbapi.com/", config);
        return res.data.Search;
    } else if (filmMode.value == "tvshow") {
        const res = await axios.get(`https://api.tvmaze.com/search/shows/?q=${value}`);
        return res.data;
    }

}
const displayShow = (arrItems) => {
    if (data.length !== 0) {
        for (show of arrItems) {
            if(show.show.image) {;
                displaySearches.innerHTML += 
                `<li class="col-md-6 col-lg-3 mb-5 mr-0">
                        <h4 class="showTitle mb-2">${show.show.name}</h4>
                        <img class="showPoster img-fluid" src=${show.show.image.medium}></img>
                        <a href="${show.show.url}" class="btn btn-outline-light mt-2">View website</a>
                </li>`
            }
        }
    } else {
        console.log("NO MATCHES FOUND!");
    }
}

const displayMovie = (arrItems) => {
    if (data.length !== 0) {
        for (movie of arrItems) {
            if(movie.Poster != "N/A" && movie.Type == "movie") {;
                displaySearches.innerHTML += 
                `<li class="col-md-6 col-lg-3 mb-5 mr-0 justify-content-center">
                    <h4 class="showTitle mb-2">${movie.Title}</h4>
                    <img class="showPoster img-fluid" src=${movie.Poster}></img>
                    <div class="row mx-1 mt-2">
                        <a onclick=getMovieDetails("${movie.imdbID}") href="#" class="btn btn-outline-light col">More details</a>
                        <span class="showGenre col">${movie.Year}</span>
                    </div>
                </li>`
            }
        }
    } else {
    console.log("NO MATCHES FOUND!");
    }
}

const getMovieDetails = async (imdb) => {
    const config = {params: {apikey : "37697e59", r: "json", i: imdb}};
    const res = await axios.get("https://www.omdbapi.com/", config);
    
    console.log(res.data)

    displaySearches.style.display = "none";
    displayMovieDetails(res.data)

}

const displayMovieDetails = (movie) => {

    search.style.display = "none";
    hr.style.display = "none";

    let imdbColor = "";

    if(movie.imdbRating >= 7.5) {
        imdbColor = "bg-success text-white";
    } else if (movie.imdbRating >= 5 && movie.imdbRating < 7.5) {
        imdbColor = "bg-warning";
    } else {
        imdbColor = "bg-danger text-white"
    }

    displayDetails.innerHTML +=
    `<div class="row my-5 justify-content-center align-items-end" id="movieDetailsContainer">
        <div class="col-xs-12 col-md-6">
            <a class="backTo" href="#" onclick=backToSearch()>
            <span class="material-icons">
            first_page
            </span>Back to search</a>
            <h4>${movie.Title}<span class="ml-2 badge badge-secondary">${movie.Runtime}</span></h4>
            <img src="${movie.Poster}">
        </div>
        <div class="col-xs-12 col-md-6 my-4 mb-md-5" id="movieDetails">
            <h4>Movie Details</h4>
            <ul class="p-0">
                <li>Actors: <span>${movie.Actors}</span></li>
                <li>Filmed In: <span>${movie.Country}</span></li>
                <li>PG: <span>${movie.Rated}</span></li>
                <li>Date Released: <span>${movie.Released}</span></li>
                <li>Genres: <span>${movie.Genre}</span></li>
                <li>Box Office: <span>${movie.BoxOffice}</span></li>
                <li>Awards: <span>${movie.Awards}</span></li>
            </ul>
            <span class="${imdbColor}">IMDb Rating - ${movie.imdbRating}</span>
        </div>
        <div class="col-12">
            <div class="bg-secondary pl-3 py-3 moviePlot">
                <h2 class="display-4">Plot</h2>
                <p class="lead">${movie.Plot}</p>
                <span class="bg-dark p-1"><span>Directed by: ${movie.Director}</span></span>
            </div>
        </div>
    </div>`

}

const backToSearch = () => {
    displayDetails.innerHTML = "";
    displaySearches.style.display = "flex";
    search.style.display = "block";
    hr.style.display = "block";
}

const deleteItems = (arrItems) => {
    if (arrItems.length >= 1 ) {
        for (let i = 0; i < arrItems.length; i++) {
            arrItems.splice([i]);
        }
        displaySearches.innerHTML = "";
    }
}

