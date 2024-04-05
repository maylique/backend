import mongoose, { Schema } from "mongoose";

const entrySchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  bird: {
    type: mongoose.Types.ObjectId,
    ref: "Bird",
  },
});

export const Entry = mongoose.model("Entry", entrySchema);
