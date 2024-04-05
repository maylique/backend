import mongoose from "mongoose";
import "dotenv/config";
import { Bird } from "./models/bird.js";
import birdData from '../birds.json' with {type: "json"}

await mongoose.connect(process.env.MONGODB_URI);


await Bird.deleteMany();
await Bird.insertMany(birdData);

await mongoose.connection.close();
