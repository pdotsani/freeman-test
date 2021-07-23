import express from "express";
import axios from "axios";
import memoryCache from "memory-cache";

require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT ? process.env.PORT : 3100;
const THE_MOVIE_DB_URL = process.env.THE_MOVIE_DB_URL;
const apiKeyParam = `api_key=${process.env.THE_MOVIE_DB_API_KEY}`

const cache = duration => {
  return (res, req, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = memoryCache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        memoryCache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

app.get("/api/movies/popular", cache(60), (_, res) => {
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

app.get("/api/movies/search", cache(60), (req, res) => {
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

app.get("/api/movie/:movieId", cache(60), (req, res) => {
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


app.listen(PORT, () => {
  console.log(`Server is running`);
});