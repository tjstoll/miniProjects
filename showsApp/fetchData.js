'use strict';

// Get the search string
const input = document.querySelector('#search');
let searchKey;
const baseURL = "https://api.tvmaze.com/search/shows?q=";
let searchURL = baseURL
let results;

function searchHandler(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchKey = input.value.replaceAll(' ', '%');;
        searchURL += searchKey;
        console.log(searchURL);
        input.value = "";
        // this should execute once the search has been performed
        searchURL = baseURL;
    }
}

input.addEventListener('keypress', searchHandler);

// Delet this line in production
results = JSON.parse(data);

async function getData(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
    results = data;
    })
    .catch(e => {
        console.log('Somethine went wrong')
        console.log(e)
    })
}