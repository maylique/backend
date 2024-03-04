import fs from 'fs/promises'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { fileTypeFromBuffer } from 'file-type'
import {v4 as uuid} from 'uuid'
const app = express()
const PORT = 3000
const blogsPath = './db.json'
const upload = multer({ dest: "uploads/" });

const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
};

app.use(express.json())
app.use(cors(corsOptions))
app.use("/uploads", express.static("./uploads"));

const readBlogJson = async () => JSON.parse(await fs.readFile(blogsPath, {encoding: 'utf8'}))

const writeBlogJson = (blog) =>
  fs.writeFile(blogsPath, JSON.stringify(blog));

app.post("/blogs", upload.single("image"), async (req, res) => {
  try {
    // multer speichert die Datei automatisch im /uploads/ ordner
    // ueber req.file erhalten wir metadaten, z.B. den Dateipfad der neuen Datei
    const imagePath = req.file.path;
    // wir lesen die datei als buffer
    const imageBuffer = await fs.readFile("./" + imagePath);
    // und rufen mit ihr fileTypeFromBuffer auf, um eine geeignete Dateiendung zu erhalten
    const fileTypeResult = await fileTypeFromBuffer(imageBuffer);
    // kombinieren diese mit dem bisherigen Dateipfad
    const imagePathWithExtension = `${imagePath}.${fileTypeResult.ext}`;
    // und benennen die Datei entsprechend um
    await fs.rename(`./${imagePath}`, `./${imagePathWithExtension}`);

    const newBlog = { ...req.body, imagePath: imagePathWithExtension};
    if (!newBlog.title || !newBlog.desc || !imagePath) {
      console.log('hjans peter stiinkt');
      throw new Error("Blog undefined");
    }
    const blog = await readBlogJson();
    await writeBlogJson([...blog, newBlog]);

    res.status(201).json(newBlog);
  }catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.patch("/blogs/:title", async (req, res) => {
  try {
    // die id der ressource das wir verändern wollen
    const title = req.params.title;
    // req.body enthält die daten, mit denen wir die ressource patchen wollen
    const blogPatch = req.body;

    const blog = await readBlogJson();

    const newBlog = blog.map((blog) => {
      if (blog.title === title) {
        // falls wir ein todo mit der richtigen ID finden, patchen wir es mit den übermittelten daten
        return { ...blog, ...blogPatch };
      } else {
        // alle anderen geben wir unverändert zurück
        return blog;
      }
    });

    await writeBlogJson(newBlog);

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }

  res.end();
});

app.get('/blogs', async (req, res) => {
    try {
        const blog = await readBlogJson()
        res.json(blog)
    } catch (error) {
        res.status(500).end()
    }
})

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)})