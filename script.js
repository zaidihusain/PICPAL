const accesskey = "j1Ovbimr_7b9sLG5wkTmv-fbx8bikB5Jw15VJvPS9SY"

const formEl = document.querySelector("form");
const inputEl = document.getElementById("Search-input");
const searchResult = document.querySelector(".search-results");
const ShowMore = document.getElementById("Show-more-button");

let inputData = "";
let page = 1;

async function SearchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if(page ===1){
        searchResult.innerHTML = "";
    }

    results.map((result) => {
        const imagedwo = document.createElement('div');
        imagedwo.classList.add("search-results");
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        imagedwo.appendChild(imageWrapper);
        searchResult.appendChild(imagedwo);
    })

    page++
    if(page>1){
        ShowMore.style.display = "block"
    }
}

formEl.addEventListener('submit', (event) => {
    event.preventDefault()
    page = 1;
    SearchImages()
})

ShowMore.addEventListener('click', (event) => {
    event.preventDefault()
    SearchImages()
})