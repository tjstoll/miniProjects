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

function DisplayError() {
    const error_div = document.createElement('div');
    error_div.classList = ['error'];
    const error_message = document.createElement('p');
    const error_text = document.createTextNode('Something went wrong with your search...');
    error_message.appendChild(error_text);
    error_div.appendChild(error_message);

    return error_div;
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
            search_results.appendChild(DisplayError());
        }
    }
}

search_input.addEventListener('keypress', handleSearchInput);

function Title(data) {
    const title = document.createElement('div');
    title.classList = ['title'];

    const show_title = document.createElement('h3');
    const show_title_text = document.createTextNode(data.name);
    show_title.appendChild(show_title_text);

    const rating = document.createElement('p');
    let rating_text;
    if(data.rating.average == null) {
        rating_text = document.createTextNode("No Rating");
    } else {
        rating_text = document.createTextNode(`Rating: ${data.rating.average}`);
    }
    rating.appendChild(rating_text);

    const genres = document.createElement('p');
    let genres_text;
    if(data.genres.length > 0) {
        genres_text = document.createTextNode(`Genres: ${data.genres.join(', ')}`);
    } else {
        genres_text = document.createTextNode("No genres listed");
    }
    genres.appendChild(genres_text);

    title.appendChild(show_title);
    title.appendChild(rating);
    title.appendChild(genres);

    return title
}

function Description(summary_data) {
    const description = document.createElement('div');
    description.classList = ['description']

    const summary = document.createElement('p');
    let formatted_summary;
    if (summary_data == null) {
        formatted_summary = "No Description Available";
    } else {
        formatted_summary = summary_data.replaceAll(/<p>|<\/p>|<b>|<\/b>/g, '');
    }

    const summary_text = document.createTextNode(formatted_summary);
    summary.appendChild(summary_text);

    description.appendChild(summary);

    return description;
}

function Info(data) {
    const info = document.createElement('div');
    info.classList = ['info'];
    
    info.appendChild(Title(data));
    info.appendChild(Description(data.summary));

    return info;
}

function Poster(img) {
    const poster = document.createElement('div');
    poster.classList = ['poster'];
    const poster_img = document.createElement('img');
    
    try {
        poster_img.src = img.medium;
        poster.appendChild(poster_img);

    } catch(e) {
        poster.innerHTML = "<p>NO IMAGE<br>AVAILABLE</p>";
    }


    return poster;
}

function Message(text) {
    const message = document.createElement('div');
    message.classList = ['message'];
    const msg = document.createElement('h2')
    const message_text = document.createTextNode(`Showing reaults for: ${text}`);
    
    msg.appendChild(message_text);
    message.appendChild(msg);

    return message;

}

function Result(show) {
    const result = document.createElement('section');
    result.classList = ['result'];

    result.appendChild(Poster(show.image));
    result.appendChild(Info(show));

    return result;
}

function NoResults() {
    const no_results = document.createElement('section');
    const no_results_message = document.createElement('p')
    const no_results_text = document.createTextNode('No results found...');
    no_results_message.appendChild(no_results_text);
    no_results.appendChild(no_results_message);
    return no_results;
}

function SearchResults(data) {
    search_results.innerHTML = "";
    search_results.appendChild(Message(search_input.value));
    if (data.length > 0) {
        const results = data.map((d) => {
            return Result(d.show);
        });
    
        results.forEach((res) => {
            search_results.appendChild(res);
        });   
    } else {
        search_results.appendChild(NoResults());
    }
}

// SearchResults(search_data);