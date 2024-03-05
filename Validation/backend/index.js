import express from 'express'
import fs from 'fs/promises'
import cors from 'cors'
import { z } from 'zod'
import { v4 as uuid}  from 'uuid'
import multer from 'multer'

const PORT = 3000
const app = express()
const guestDataBase = './db.json'
const backendUrl =process.env.BACKEND_URL

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionSuccessStatus: 200,
}

app.use(express.json())
app.use(cors(corsOptions))

const upload = multer({ dest: "uploads/" });

const readGuestJson = async ()  => JSON.parse(await fs.readFile(guestDataBase, {encoding: "utf-8"}))

const writeGuestJson = (guest) => fs.writeFile(guestDataBase, JSON.stringify(guest))

try {
    await fs.access(guestDataBase)
} catch (err) {
    await writeGuestJson([])
}

app.get('/guest', async (req, res) => {
    try {
        const guests = await readGuestJson()
        res.json(guests)
    } catch (error) {
        res.status(500).end()
    }
})

app.post('/guest',upload.none("") , async (req, res) => {
    const guestInputScheme = z.object({
        surname: z.string(),
        lastname: z.string(),
        email: z.string(),
        text: z.string(),
    })
    try {
        const parsedInput = guestInputScheme.safeParse({
        ...req.body,
    });

    if (!parsedInput.success) {
        console.error('halloooo', parsedInput.error);
        res.sendStatus(400);
        return;
    }

    const newGuests = {
        ...parsedInput.data,
        id: uuid()
    };

    const guests = await readGuestJson();
    await writeGuestJson([...guests, newGuests]);

    res.status(201).json(newGuests);
    } catch (error) {
        console.error(error)
        res.status(500).end()
    }
})

app.listen(PORT, () => {
    console.log(`listening on ${backendUrl}`);
})