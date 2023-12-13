'use strict';

let search_data = []; //JSON.parse(data);
let container = document.querySelector(".container");
const root = ReactDOM.createRoot(container);
const baseURL = "https://api.tvmaze.com/search/shows?q=";

// Data ---------------------------------------------------------------
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

// React ----------------------------------------------------------------------
function SearchForm({handleKeyPress}) {
    return (
        <section id="search_area">
            <form action="">
                <input
                type="text"
                placeholder="Search Shows..."
                id="search_input"
                onKeyPress = {handleKeyPress}
                />
            </form>
        </section>
    );
}

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

function Poster({imgSrc, altText}) {
    try {
        return (
            <div className="poster">
                <img src={imgSrc.medium} alt={altText}/>;
            </div>
        )
    } catch (e) {
        return (
            <div className="poster">
                <p>NO IMAGE<br/>AVAILABLE</p>
            </div>
            )
    }
}

function Result({showData}) {
    return (
        <section className="result">
            <Poster imgSrc={showData.image} altText={showData.name}/>
            <div className="info">
                <Title title={showData.name} rating={showData.rating.average} genreList={showData.genres}/>
                <Description summary={showData.summary}/>
            </div>
        </section>
    );
}


function SearchResults({data}) {
    if (data.length > 0) {
        const results = data.map((d) => <Result key={d.show.id} showData={d.show} />);
        return <section id="search_results">{results}</section>;
    } else {
        return (
        <section>
            <h1>Search your favourite shows!</h1>
        </section>
        );
    }
}

// Build ----------------------------------------------------------------------
function App() {
    const [data, setData] = React.useState([]);

    async function handleKeyPress(e) {
        if (e.key == "Enter") {
            e.preventDefault();
            const search_input = document.querySelector('#search_input');
            let search_value = search_input.value.replaceAll(' ', '+');
            let searchURL = baseURL + search_value;

            try {
                await getData(searchURL);
                search_input.value = '';
                setData(search_data);
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <>
            <SearchForm handleKeyPress={handleKeyPress}/>
            <SearchResults data={search_data} />
        </>
    )
}

root.render(<App />);