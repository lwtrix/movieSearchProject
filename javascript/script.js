const showSearch = document.querySelector("#searchForm")
const searchSubmit = document.querySelector("#searchSubmit");
const searchInput = document.querySelector("#searchInput");
const displaySearches = document.querySelector("#displaySearches");
const filmMode = document.querySelector("#filmMode");
const movieSearch = document.querySelector("#movieSearch");
const movies = document.querySelector("#movies");
const movieInput = document.querySelector("#movieInput")
const tvShows = document.querySelector("#tvShows");
const logo = document.querySelector("#logo")

let data = [];

showSearch.addEventListener("submit", async function (e) {
        e.preventDefault();
        const searchValue = showSearch.elements.searchInput.value;
        
        deleteItems(data);
        data = await fetchShowsAPI(searchValue);
        displayShow(data);
        searchInput.value = "";

        console.dir(data);
});


movieSearch.addEventListener("submit", async function (e) {
        e.preventDefault();
        const searchValue = movieSearch.elements.movieInput.value;

        deleteItems(data);
        data = await fetchShowsAPI(searchValue);
        displayMovie(data);
        movieInput.value = "";

        console.dir(data);
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
        const res = await axios.get("http://www.omdbapi.com/", config);
        return res.data.Search;
    } else if (filmMode.value == "tvshow") {
        const res = await axios.get(`http://api.tvmaze.com/search/shows/?q=${value}`);
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
                        <a href="${show.show.url}" class="btn btn-outline-light ml-2 mt-2">View website</a>
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
                `<li class="col-md-6 col-lg-3 mb-5 mr-0">
                    <h4 class="showTitle mb-2">${movie.Title}</h4>
                    <img class="showPoster img-fluid" src=${movie.Poster}></img>
                <div class="card-body">
                    <span class="showGenre card-subtitle">${movie.Year}</span>
                </div>
                </li>`
            }
        }
    } else {
    console.log("NO MATCHES FOUND!");
    }
}


const deleteItems = (arrItems) => {
    if (arrItems.length >= 1 ) {
        for (let i = 0; i < arrItems.length; i++) {
            arrItems.splice([i]);
        }
        displaySearches.innerHTML = "";
    }
}