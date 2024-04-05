import mongoose, { Schema } from'mongoose';

const movieSchema = new Schema({
    title: String,
    genre: [],
    year: Number,
    runtime: Number,
    poster: String,
    plot: String,
    imdb: {rating: String},
    countries: [],
})

export const Movie = mongoose.model('movieDetail', movieSchema, "movieDetails")