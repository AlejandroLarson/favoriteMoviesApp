import express from 'express';
import fetch from 'node-fetch';
const movieQuote = (await import('popular-movie-quotes')).default;
import "dotenv/config";

// TMDB api key
const apiKey = process.env.API_KEY;
// Unplash api key
const unsplashApiKey = process.env.UNSPLASH_API_KEY;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    try{
    let url = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&featured=true&query=filmmaking`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render("index", { "image": randomImage })
    } catch (error) {
        console.error("Unsplash Background API error ", error);
        // fallback for background if api fetch fails
        res.render("index", {"image" : "https://www.careersinfilm.com/wp-content/uploads/2022/05/filmmaker.jpg"})
    }

});


app.get('/bladerunner', async (req, res) => {
    let movieName = "Blade Runner";
    // doing web api call with TMDB
    // searching movie by name
    let searchUrl = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${apiKey}`;
    let searchResponse = await fetch(searchUrl);
    let searchData = await searchResponse.json();
    let movieId = searchData.results[0].id;

    // get movie details and credits by id found above
    let detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&api_key=${apiKey}`;
    let detailsRes = await fetch(detailsUrl);
    let movieData = await detailsRes.json();

    
    // I need to get director separately since they require a little more effort to loop through data and save them
    let directorName = movieData.credits.crew.find(person => person.job === "Director").name;

    // getting a movie quote using NPM package popular-movie-quotes
    let singleMovieQuote = movieQuote.getQuotesByMovie(`${movieName}`)[0].quote;

    res.render("bladerunner", { movieData, directorName, singleMovieQuote });
});

app.get('/casablanca', async (req, res) => {
    let movieName = "Casablanca";
    let searchUrl = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${apiKey}`;
    let searchResponse = await fetch(searchUrl);
    let searchData = await searchResponse.json();
    let movieId = searchData.results[0].id;

    let detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&api_key=${apiKey}`;
    let detailsRes = await fetch(detailsUrl);
    let movieData = await detailsRes.json();

    let directorName = movieData.credits.crew.find(person => person.job === "Director").name;

    let singleMovieQuote = movieQuote.getQuotesByMovie("casablanca")[0].quote;
    res.render("casablanca", { movieData, directorName, singleMovieQuote });
});

app.get('/onthewaterfront', async (req, res) => {
    let movieName = "On the Waterfront";
    let searchUrl = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${apiKey}`;
    let searchResponse = await fetch(searchUrl);
    let searchData = await searchResponse.json();
    let movieId = searchData.results[0].id;

    let detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&api_key=${apiKey}`;
    let detailsRes = await fetch(detailsUrl);
    let movieData = await detailsRes.json();

    let directorName = movieData.credits.crew.find(person => person.job === "Director").name;

    let singleMovieQuote = movieQuote.getQuotesByMovie("on the waterfront")[0].quote;
    res.render("onthewaterfront", { movieData, directorName, singleMovieQuote });
});

app.get('/thebiglebowski', async (req, res) => {
    let movieName = "The Big Lebowski";
    let searchUrl = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${apiKey}`;
    let searchResponse = await fetch(searchUrl);
    let searchData = await searchResponse.json();
    let movieId = searchData.results[0].id;

    let detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&api_key=${apiKey}`;
    let detailsRes = await fetch(detailsUrl);
    let movieData = await detailsRes.json();

    let directorName = movieData.credits.crew.find(person => person.job === "Director").name;

    let singleMovieQuote = movieQuote.getQuotesByMovie("the big lebowski")[0].quote;
    res.render("thebiglebowski", { movieData, directorName, singleMovieQuote });
});

app.listen(3000, () => {
    console.log('server started');
});

