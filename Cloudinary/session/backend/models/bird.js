import mongoose, { Schema } from "mongoose";

const birdSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  latinName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  size: {
    type: String,
  },
  food: { type: [String], default: () => [], required: true },
});

export const Bird = mongoose.model("Bird", birdSchema, "voegel");
