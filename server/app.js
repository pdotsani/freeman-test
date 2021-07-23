import express from "express";
import axios from "axios";

require('dotenv').config();

const app = express();

app.use(express.json());

const THE_MOVIE_DB_URL = process.env.THE_MOVIE_DB_URL;
const apiKeyParam = `api_key=${process.env.THE_MOVIE_DB_API_KEY}`

app.get("/api/movies/popular", (_, res) => {
  (async () => {
    await axios
      .get(`${THE_MOVIE_DB_URL}/3/movie/popular?${apiKeyParam}`)
      .then((response) => {
        res.send(response.data);
      }).catch((error) => {
        res.send(error).sendStatus(500);
      })
  })()
});

app.get("/api/movies/search", (req, res) => {
  const q = req.query.q;
  (async () => {
    await axios
      .get(`${THE_MOVIE_DB_URL}/3/search/movie?query=${q}&${apiKeyParam}`)
      .then((response) => {
        res.send(response.data);
      }).catch((error) => {
        res.send(error).sendStatus(500);
      })
  })()
});

app.get("/api/movie/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  (async () => {
    await axios
      .get(`${THE_MOVIE_DB_URL}/3/movie/${movieId}?${apiKeyParam}`)
      .then((response) => {
        res.send(response.data);
      }).catch((error) => {
        res.send(error).sendStatus(500);
      })
  })()
});


app.listen(3100, () => {
  console.log(`Server is running`);
});