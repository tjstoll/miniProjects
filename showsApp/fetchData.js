'use strict';

let search_data; // = JSON.parse(data);
let search_results = document.querySelector("#search_results");
const search_input = document.querySelector('#search_input');
const baseURL = "https://api.tvmaze.com/search/shows?q=";

async function getData(url) {
    await fetch(url)
    .then(response => response.json())
    .then(data => {
    search_data = data;
    })
    .catch(e => {
        console.log('Somethine went wrong');
        console.log(e);
    });
}

async function handleSearchInput(e) {
    if (e.key == "Enter") {
        e.preventDefault();
        let search_value = search_input.value.replaceAll(' ', '+');
        let searchURL = baseURL + search_value;
        
        try {
            await getData(searchURL);
            SearchResults(search_data);
            search_input.value = '';
        } catch(e) {
            console.log(e);
        }
    }
}

search_input.addEventListener('keypress', handleSearchInput);

function SearchResults(data) {
    search_results.innerHTML = "";
    console.log(data);
    // search_results.appendChild(Message(search_input.value));
    // if (data.length > 0) {
    //     const results = data.map((d) => {
    //         return Result(d.show);
    //     });
    
    //     results.forEach((res) => {
    //         search_results.appendChild(res);
    //     });   
    // } else {
    //     search_results.appendChild(NoResults());
    // }
}