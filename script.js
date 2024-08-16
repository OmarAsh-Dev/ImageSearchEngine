const accesskey = "rqckUXgdReCzgjTWacwPAmq6U76yKkSg4hr4yWuOcKg";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsEl = document.getElementById("search-results");
const showmoreButton = document.getElementById("show-more");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;
    const res = await fetch(url);
    const data = await res.json();

    if (page === 1) {
        resultsEl.innerHTML = "";
    }

    const results = data.results;
    results.map((result) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        const image = document.createElement("img");
        image.src = result.urls.regular;
        image.title = result.urls.small_s3;
        image.onload = () => {
            image.classList.add("loaded");
        };

        const urlOverlay = document.createElement("div");
        urlOverlay.classList.add("url-overlay");
        urlOverlay.textContent = result.links.html;
        urlOverlay.style.display = "none"; 

        imageContainer.appendChild(image);
        imageContainer.appendChild(urlOverlay);
        resultsEl.appendChild(imageContainer);

        let hoverTimer;

        imageContainer.addEventListener("mouseover", () => {
            hoverTimer = setTimeout(() => {
                urlOverlay.style.display = "block";
            }, 5000); 
        });

        imageContainer.addEventListener("click", (e) => {
            e.preventDefault();
            clearTimeout(hoverTimer);
            urlOverlay.style.display = "block";
            window.open(result.links.html, '_blank');
        });

        imageContainer.addEventListener("mouseout", () => {
            clearTimeout(hoverTimer);
        });
    });

    showmoreButton.style.display = "block";
    console.log(data);
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showmoreButton.addEventListener("click", () => {
    page++;
    searchImages();
});

