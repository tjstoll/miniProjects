'use strict';

const baseURL = "https://api.tvmaze.com/";
let searchURL = baseURL + "search/shows?q=girls";
let results;
// Delet this line in production
results = JSON.parse(data);

const test_results = [
    {
        id: '123',
        imgSrc: "https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",
        name: 'Girls',
        rating: 6.8,
        genres: ['Comedy', 'Drama', 'Romance'],
        description: "This show is about blah blah blah"
    },
    {
        id: '456',
        imgSrc: "https://static.tvmaze.com/uploads/images/medium_portrait/406/1015813.jpg",
        name: 'Another Show',
        rating: 8.1,
        genres: ['Dark', 'Drama', 'Thriller'],
        description: "Definitely not Girls..."
    }
]

// fetch(searchURL)
// .then(response => response.json())
// .then(data => {
//     results = data;
// })
// .catch(e => {
//     console.log('Somethine went wrong')
//     console.log(e)
// })