const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

console.log('movie.routes loaded');

// GET de todas las películas
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET peliculas por id
router.get('/movies/id/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json('No movie found by this id');
    }
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET peliculas por título
router.get('/movies/title/:title', async (req, res) => {
  try {
    const movieByTitle = await Movie.find({ title: req.params.title });
    return res.status(200).json(movieByTitle);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET peliculas por género
router.get('/movies/genre/:genre', async (req, res) => {
  try {
    const movieByGenre = await Movie.find({ genre: req.params.genre });
    return res.status(200).json(movieByGenre);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET peliculas por año
router.get('/movies/year/:year', async (req, res) => {
  try {
    const movieByYear = await Movie.find({ year: { $gt: req.params.year } });
    return res.status(200).json(movieByYear);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// POST para crear película
router.post('/movies', async (req, res) => {
  console.log('POST /movies hit ✅', req.body);
  try {
    const newMovie = new Movie(req.body);
    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (err) {
    return res.status(500).json(err);
  }
});0

// PUT para modificar pelicula
router.put('/movies/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedMovie) {
      return res.status(404).json('No movie found by this id');
    }

    return res.status(200).json(updatedMovie);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE para eliminar peliculas
router.delete('/movies/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json('No movie found by this id');
    }

    return res.status(200).json('Movie deleted');
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
