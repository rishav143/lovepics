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
<img width="956" alt="Screenshot 2024-06-28 at 1 15 48 PM" src="https://github.com/rishav143/lovepics/assets/93703303/61a0c697-dae7-406a-b0e2-e4826e34e406">

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
