import express from 'express';
import { Movie } from '../models/movie.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find().lean()
  res.json(movies);
});

router.post('/', async (req, res) => {
  const movie = new Movie(req.body);
  const savedMovie = await movie.save();
  res.json(savedMovie);
});


export default router;