import mongoose from "mongoose";
import 'dotenv/config'
import express from "express";
import cors from "cors";
import MoviesRouter from "./controller/movies.js";

await mongoose.connect(process.env.MONGODB_URL);

const app = express();

app.use(cors());

app.use('/movies', MoviesRouter)

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.BACKEND_URL}`)})