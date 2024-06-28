# lovepics
lovepics is web project for showing image content from pixway website. This project made completely using HTML, CSS and Javascript. 
# Main Features
- Layout of Webpage
- Pixway API
- Debouncing
- Search auto suggestion
- Paginantion
## 1. Layout of Webpage
Layout of webpage have one section Container that holds 3 children : 
- Header
- Main
- Footer

Header contains Logo title, Navigation items, and Search form. For header layout we have used the concept of grid.
```
.header {
    width: 100%;
    position: absolute;
    display: grid;
    grid-template-areas: "... logo .... .... navbar"
    ".... search search search search";
    color: #eee;
    gap: 10px;
}
```

<img width="892" alt="Screenshot 2024-06-28 at 8 14 11 PM" src="https://github.com/rishav143/lovepics/assets/93703303/61134b11-5723-42ed-a916-f8d8cf8c1f78">

Main section have content and paginantion. For items inside the content we have used flex for the layout.

```
#content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    font-family: poppins;
    font-weight: 400;
    font-style: italic;
}
```
In Footer section, text content is align in the centre using flex.
```
.footer {
    height: 400px;
    background-color: rgba(255, 179, 203, 0.716);
    display: flex;
    align-items: center;
    justify-content: center;
}
```
## 2. Pixway API
Pixway API is a RESTful interface for searching and retrieving royalty-free images and videos released by Pixabay under the Content License.
### Parameter used

| Parameter  | Data type |     Description |
| ------------- | ------ | ------------- |
| q | str |A URL encoded search term. If omitted, all images are returned. This value may not exceed 100 characters.Example: "yellow+flower"  |
| image_type  | str |	Filter results by image type. Accepted values: "all", "photo", "illustration", "vector" Default: "all" |
| pretty  | bool |	Indent JSON output. This option should not be used in production. Accepted values: "true", "false" Default: "false" |
| page | int |	Returned search results are paginated. Use this parameter to select the page number. Default: 1  |

Here, Page parameter used in code is dynamic in nature with respect to Set Pagination feature in the page. Below is the Pseudo code of fetchPictureByPage() function : 
```
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
```
## 3. Debouncing
### What is Debouncing?
Debouncing is a programming pattern or a technique to restrict the calling of a time-consuming function frequently, by delaying the execution of the function until a specified time to avoid unnecessary CPU cycles, and API calls and improve performance.
### Implementation of debouncing
```
function debounce(func, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    }
}
```
## 4. Search auto suggestion
The browser will call the display function after every single keypress. Then it passes the current search to an autocompleteMatch function to get the list of matched terms. Finally, the results are added to the div as an unordered list.

When you run this code, you’ll notice that matched terms appear as bullet points below the search box.
```
var search_terms = []
function autocompleteMatch(input) {
    if(input == '') return [];
    var reg = new RegExp(input)
    return search_terms.filter((term) => term.match(reg));
}
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

```
## 5. Paginantion
The setPaginantion function receives two arguments, currentPage and totalPages, from the fetchPictureByPage function. The currentPage helps to create new buttons, and totalPages determines the end of the pagination. When a user clicks on a page button, it calls the fetchPictureByPage function, which displays content on the page from the API and dynamically creates the next, middle, and previous buttons on the current page. The “prev” and “next” buttons will be disabled when the user reaches the boundary conditions.
```
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
```
