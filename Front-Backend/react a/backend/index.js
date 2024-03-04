import express from 'express'
import fs from 'fs/promises'
import cors from 'cors'

const PORT = 3000
const app = express()
const FILE_PATH = './todo.json'

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())

app.use(async (req, res, next) => {
    try {
        await fs.access(FILE_PATH)
    } catch (e) {
        await fs.writeFile(FILE_PATH, JSON.stringify([]))
    }
    next()
})

app.get('/todos', async (req, res, next) => {
    try {
        const todos = await fs.readFile(FILE_PATH, 'utf8')
        res.json(JSON.parse(todos))
    } catch (err) {
        next(err)
    }
})

app.post('/todos', async (req, res, next) => {
    try {
        const newToDo = req.body
        if (!newToDo.todo) {
            throw new Error("todo not defined")
        }
        const toDo = await fs.readFile(FILE_PATH, { encoding: "utf-8" });
        const toDoJson = JSON.parse(toDo);
        const newToDos = [...toDoJson, newToDo];
        await fs.writeFile(FILE_PATH, JSON.stringify(newToDos))
        res.status(201).json(newToDo)
    } catch (err) {
        next(err)
    }
})

const readDbFile = async () => {
    const data = await fs.readFile("./todo.json", { encoding: "utf-8" });
    return JSON.parse(data);
  };

  const writeDbFile = (dataJson) => {
    const dataString = JSON.stringify(dataJson);
    return fs.writeFile("./todo.json", dataString);
  };

app.patch('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id

        const patchData = req.body

        const todos = await readDbFile()

        const todo = todos.find((item) => item.todoId === id)

        todo.todoDone = patchData.todoDone

        await writeDbFile(todos)

        res.sendStatus(204)
    }
    catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
}
)

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).end()
})

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})