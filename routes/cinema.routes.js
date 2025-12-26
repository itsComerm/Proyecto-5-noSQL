const express = require('express');
const Cinema = require('../models/Cinema');

const router = express.Router();

// GET detodos los cines
router.get('/cinemas', async (req, res) => {
  try {
    const cinemas = await Cinema.find().populate('movies');
    return res.status(200).json(cinemas);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// POST crear un cine
router.post('/cinemas', async (req, res) => {
  try {
    const newCinema = new Cinema(req.body);
    const createdCinema = await newCinema.save();
    return res.status(201).json(createdCinema);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
