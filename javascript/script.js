const searchForm = document.querySelector("#searchForm")
const searchSubmit = document.querySelector("#searchSubmit");
const searchInput = document.querySelector("#searchInput");
const displaySearches = document.querySelector("#displaySearches");

let data = [];

searchForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const searchValue = searchForm.elements.searchInput.value;
        
        deleteItems(data);
        data = await fetchShowsAPI(searchValue);
        displayItems(data);
        searchInput.value = "";
        
});

const fetchShowsAPI = async (value) =>  {
    const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${value}`);
    return res.data;
}

const createItem = (showTitle, showImg, showGenres, showSummary) => {
    showTitle.innerText = item.show.name;
    showImg.src = item.show.image.medium;
    showGenres.innerText = item.show.genres;
    showSummary.innerHTML = item.show.summary;
}

const displayItems = (arrItems) => {
    if (data.length !== 0) {
        for (item of arrItems) {
            if(item.show.image) {
                const newItem = document.createElement("li");
                const title = document.createElement("h2");
                const img = document.createElement("img");
                const genres = document.createElement("span");
                const summary = document.createElement("p");

                createItem(title, img, genres, summary);
                newItem.append(title, img, genres, summary);
                displaySearches.append(newItem);
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
}