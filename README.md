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
