import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

import birdRouter from "./controller/birds.js";
import entryRouter from "./controller/entries.js";

await mongoose.connect(process.env.MONGODB_URI);

cloudinary.config({
  cloud_name: "du97czlhz",
  api_key: "452675419245823",
  api_secret: process.env.CLOUDINARY_SECRET,
});

const PORT = 3000;
const app = express();

app.use(cors());
app.use("/birds", birdRouter);
app.use("/entries", entryRouter);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
