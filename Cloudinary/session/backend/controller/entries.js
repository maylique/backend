import express from "express";
import { Entry } from "../models/entry.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { uploadImage } from "../utils/uploadImage.js";

// dieser Router wird nur aufgerufen, wenn der Request auf /entries beginnt
const router = express.Router();

const storage = multer.memoryStorage();
const mult = multer({ storage: storage });

// d.h. wird diese route bei GET /entries/ ausgelöst
router.get("/", async (req, res) => {
  // mit populate fuegen wir die daten des verlinkten dokuments im angegebenen Feld ein.
  const entries = await Entry.find().lean().populate("bird");
  console.log(entries);
  res.json(entries);
});

router.post("/", mult.single("bild"), async (req, res) => {
  console.log(req.file);
  try {
    const response = await uploadImage(req.file.buffer);
    const newBird = new Entry({
      content: req.body.content,
      bird: req.body.bird,
      imageUrl: response.url,
    });
    const saveResult = await newBird.save();

    console.log(response);
    res.status(201).json(saveResult);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
