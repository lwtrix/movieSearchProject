const showSearch = document.querySelector("#searchForm")
const searchSubmit = document.querySelector("#searchSubmit");
const searchInput = document.querySelector("#searchInput");
const displaySearches = document.querySelector("#displaySearches");
const filmMode = document.querySelector("#filmMode");
const movieSearch = document.querySelector("#movieSearch");
const movies = document.querySelector("#movies");
const movieInput = document.querySelector("#movieInput")
const tvShows = document.querySelector("#tvShows");
const movieList = document.querySelector("#displayMovies")

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

const createShow = (showTitle, showImg, showGenres, showSummary) => {
    showTitle.innerText = item.show.name;
    showImg.src = item.show.image.medium;
    showGenres.innerText = item.show.genres;
    showSummary.innerHTML = item.show.summary;
}

const displayShow = (arrItems) => {
    if (data.length !== 0) {
        for (item of arrItems) {
            if(item.show.image) {
                const newItem = document.createElement("li");
                const title = document.createElement("h2");
                const img = document.createElement("img");
                const genres = document.createElement("span");
                const summary = document.createElement("p");

                createShow(title, img, genres, summary);
                newItem.append(title, img, genres, summary);
                displaySearches.append(newItem);
            }
        }
    } else {
        console.log("NO MATCHES FOUND!");
    }
}

const createMovie = (movieTitle, movieImg, movieYear) => {
    movieTitle.innerText = item.Title;
    movieImg.src = item.Poster;
    movieYear.innerText = item.Year;
}

const displayMovie = (arrItems) => {
    if (data.length !== 0) {
        for (item of arrItems) {
            if(item.Poster != "N/A" && item.Type == "movie") {
                const newItem = document.createElement("li");
                const title = document.createElement("h2");
                const img = document.createElement("img");
                const year = document.createElement("span");

                createMovie(title, img, year);
                newItem.append(title, img, year);
                movieList.append(newItem);
            }
        }
    } else {
        console.log("NO MATCHES FOUND!");
    }
}

const deleteItems = (arrItems) => {
    for (let i = 0; i < arrItems.length; i++) {
        arrItems.splice([i]);
    }
    displaySearches.innerHTML = "";
    movieList.innerHTML = "";
}