import express from 'express'
import fs from 'fs/promises'

const PORT = 3000

const app = express()

app.use(express.static('public'))

app.use(express.json())

app.get('/about', (req, res) => {
    res.sendFile('/public/about.html', {root: import.meta.dirname})
})

app.get('/work', (req, res) => {
    res.sendFile('/public/work.html', {root: import.meta.dirname})
})

app.get('/gallery', (req, res) => {
    res.sendFile('/public/gallery.html', {root: import.meta.dirname})
})

app.get('/api/data', async (req, res) => {
    const data = await fs.readFile('data.json')
    res.json(JSON.parse(data))
})

app.listen(PORT, () => {
    console.log(`server läuft auf http://localhost:${PORT}`)})