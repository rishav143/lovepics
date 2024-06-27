var search_terms = []
let currPage = 1;
// fetching API
function fetchPictureByPage(page) {
    currPage = page
    fetch(`https://pixabay.com/api/?key=44596385-c611dbd77759f1fe4e426bdc7&q=yellow+flowers&image_type=photo&pretty=true&page=${page}`)
    .then((result) => result.json())
    .then((response) => {
        
        let content = document.getElementById("content");
        let htmlString = ''
        for (var i = 0; i < response.hits.length; i++) {
            search_terms.push(response.hits[i].user)
            htmlString += `
            <div class="main-item">
                <img class="img-item" src="${response.hits[i].largeImageURL}"></img>
                <p> user : ${response.hits[i].user}</p>
                <p> likes : ${response.hits[i].likes}</p>
                <p> comments : ${response.hits[i].comments}</p>
                <a href="${response.hits[i].largeImageURL}">View image</a>
            </div>
            `
        }
        content.innerHTML = htmlString;
        let totalPages = response.totalHits / response.hits.length;
        setPaginantion(page, totalPages);
    })
}
function setPaginantion(currentPage, totalPages) {
    let pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    const createButton = (text, page) => {
        let button = document.createElement("button");
        button.textContent = text;
        if(page > 0) button.onclick = () => fetchPictureByPage(page);
        return button;
    }
    
    //previous page
    const prev = createButton("prev", currentPage-1);
    prev.disabled = currentPage === 1;
    pagination.appendChild(prev)

    //middle pages
    const max = 6;
    const start = Math.max(1, currentPage-Math.floor(max/2));
    const end = Math.min(totalPages, start + max - 1);
    for(var i = start; i <= end; i++) {
        const middle = createButton(i, i);
        pagination.appendChild(middle);
    }

    //next Page
    const next = createButton("next", currentPage+1);
    next.disabled = currentPage === totalPages;
    pagination.appendChild(next);
}

// debouncing & search suggestion
let searchElement = document.getElementById("search-input");
function debounce(func, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    }
}
let result = document.getElementById("suggestion");
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', () => {
        if (result && result.hasAttribute('class')) {
            result.removeAttribute('class');
            result.innerHTML = "";
        }
    });
});
function autocompleteMatch(input) {
    if(input == '') return [];
    var reg = new RegExp(input)
    return search_terms.filter((term) => term.match(reg));
}
searchElement.addEventListener("keydown", debounce(display, 500));

//selecting list item to search input
function display() {
    val = document.getElementById("search-input").value;
    result.setAttribute("class", "result")
    result.innerHTML="";
    let list = '';
    terms = autocompleteMatch(val);
    for(i=0; i<terms.length; i++) {
        list += `<li onclick="handleListClick('${terms[i]}')">` + terms[i] + '</li>';
    }
    result.innerHTML = '<ul>' + list + '</ul>';
}
function handleListClick(item) {
    document.getElementById("search-input").value = item
    terms = autocompleteMatch(item);
}

//suggested search triggered by search button
document.getElementById("search-button").addEventListener("click", (e)=> {
    e.preventDefault()
    fetchPictureBySearch();
    document.getElementById("search-input").value = ""
})
function fetchPictureBySearch() {
    fetch(`https://pixabay.com/api/?key=44596385-c611dbd77759f1fe4e426bdc7&q=yellow+flowers&image_type=photo&pretty=true&page=${currPage}`)
    .then((result) => result.json())
    .then((response) => {
        let array1Set = new Set(terms);
        let htmlString = ''
        let content = document.getElementById("content");
        response.hits.forEach(item => {
            if (array1Set.has(item.user)) {
                htmlString += `
                <div class="main-item">
                    <img class="img-item" src="${item.largeImageURL}"></img>
                    <p> user : ${item.user}</p>
                    <p> likes : ${item.likes}</p>
                    <p> comments : ${item.comments}</p>
                    <a href="${item.largeImageURL}">View image</a>
                </div>
                `
            }
        });
        content.innerHTML = htmlString;
    }).catch((e) => {
        console.log("error")
    })
}