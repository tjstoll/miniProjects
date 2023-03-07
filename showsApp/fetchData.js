'use strict';

const baseURL = "https://api.tvmaze.com/";
let searchURL = baseURL + "search/shows?q=girls";
let results;
// Delet this line in production
results = JSON.parse(data);

// fetch(searchURL)
// .then(response => response.json())
// .then(data => {
//     results = data;
// })
// .catch(e => {
//     console.log('Somethine went wrong')
//     console.log(e)
// })