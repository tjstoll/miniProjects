'use strict';

let search_data = JSON.parse(data);
let search_results = document.querySelector("#search_results");
const search_input = document.querySelector('#search_input');
const baseURL = "https://api.tvmaze.com/search/shows?q=";


// Handle Input ---------------------------------------------------------------
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

// search_input.addEventListener('keypress', handleSearchInput);

// React ----------------------------------------------------------------------
function Title({title, rating, genreList}) {
    const ratings = rating ? rating : "No Rating";
    const genres = genreList.length > 0 ? `Genres: ${genreList.join(', ')}` : "No genres listed";
    return (
        <div className="title">
            <h3>{title}</h3>
            <p>{ratings}</p>
            <p>{genres}</p>
        </div>
    );
}

function Description({summary}) {
    function clean_text(text) {
        return text.replaceAll(/<p>|<\/p>|<b>|<\/b>|<i>|<\/i>/g, '');
    }
    const formatted_summary = summary ? clean_text(summary) : "No Description Available";
    return (
        <div className="description">
            <p>{formatted_summary}</p>
        </div>
    );
}

function Poster({imgSrc}) {
    try {
        return (
            <div className="poster">
                <img src={imgSrc.medium} />;
            </div>
        )
    } catch (e) {
        return (
            <div className="Poster">
                <p>NO IMAGE<br/>AVAILABLE</p>
            </div>
            )
    }
}

function Result({showData}) {
    return (
        <section className="result">
            <Poster imgSrc={showData.image} />
            <div className="info">
                <Title title={showData.name} rating={showData.rating.average} genreList={showData.genres}/>
                <Description summary={showData.summary}/>
            </div>
        </section>
    );
}


// Build ----------------------------------------------------------------------
function SearchResults({data}) {
    const results = data.map((d) => <Result key={d.show.id} showData={d.show} />);
    return <>{results}</>;
}

const root = ReactDOM.createRoot(search_results);
root.render(<SearchResults data={search_data} />);