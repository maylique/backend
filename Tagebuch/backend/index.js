import express from "express";
import cors from "cors";
import mongoose, { Schema } from "mongoose";
import "dotenv/config";
import multer from "multer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkAuth } from "./checkAuth.js";
import crypto from "crypto";
import { mail } from "./utils/mail.js";

const app = express();
const mult = multer();
const PORT = 3000;

app.use(express.json());
app.use(cors());

await mongoose.connect(process.env.MONGODB_URI);

const eintragSchema = new Schema(
  {
    tag: { type: Date, default: Date.now },
    nachricht: { type: String },
  },
  { timestamps: true }
);
const Eintrag = mongoose.model("Eintrag", eintragSchema, "Eintragungen");

app.get("/tagebuch", checkAuth, async (req, res) => {
  const tagebuch = await Eintrag.find();
  res.send(tagebuch);
});

app.post("/add", mult.none(), async (req, res) => {
  try {
    const neueEintraege = req.body;
    const eintrag = new Eintrag(neueEintraege);
    await eintrag.save();
    res.status(201).json(eintrag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, required: true, default: false },
    verificationCode: { type: Number },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema, "Users");

app.get("/users", async (req, res) => {
  const users = await Users.find();
  res.json(users);
});

app.post("/users/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    res.sendStatus(403);
    return;
  }
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const verificationCode = crypto.randomInt(100000, 999999);

  const user = await Users.create({
    name,
    email,
    verificationCode,
    password: hash,
  });

  const emailResult = await mail.sendMail({
    from: ' "peter" <pk@test.de>',
    to: email,
    subject: "Registration",
    text: `Hey ${name}, thank you for travelling with the Deutsche Bahn! Your registration code is: ${verificationCode}`,
  });

  res.json(user);
});

app.post("/users/verify", async (req, res) => {
  const { email, verificationCode } = req.body;
  console.log(email, verificationCode);

  const user = await Users.findOne({ email: email });
  if (user.emailVerified) {
    res
      .status(400)
      .json({ status: "error", message: "Email already verified" });
  }

  const correctCode = user.verificationCode === verificationCode;
  if (correctCode) {
    user.emailVerified = true;
    await user.save();
    res.json({ status: "ok", message: "email verified" });
  } else {
    res.status(400).json({ status: "error", message: "wrong code" });
  }
});

app.post("/user/login", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.sendStatus(403);
    return;
  }
  const user = await Users.findOne({ name }).lean();
  if (user === null) {
    res.status(403).send("User not found");
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(403).send("Wrong password");
  }
  res.json(user);

  const token = jwt.sign({ name }, process.env.JWT_SECRET);

  res.json({ status: "OK", token: token });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
