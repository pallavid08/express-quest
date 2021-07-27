// Express is already installed
const express = require("express");
// Array of movies
const movies = require("./movies");
// In codesandbox we need to use the default port which is 8080
const port = 8080;

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to my favourite movie list");
});

app.get("/api/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/api/movies:id", (req, res) => {
  res.status(200).json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const matchingMovieId = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === matchingMovieId);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).send("Not found");
  }
});

app.get("/api/search", (req, res) => {
  const maxDuration = movies.filter(
    (movie) => movie.duration <= parseInt(req.query.maxDuration)
  );
  if (maxDuration) {
    res.status(200).json(maxDuration);
  } else {
    res.status(200).send([]);
  }
});

app.get("/user", (req, res) => {
  res.status(401).send("Unauthorized");
});

app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});
