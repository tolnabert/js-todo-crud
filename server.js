import express, { json } from 'express';
import { promises as fs } from 'fs';

const app = express();
const PORT = 3000;

app.use(json());

const readTodos = async () => {
  try {
    const data = await fs.readFile('todos.json', 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeTodos = async (todos) => {
  try {
    await fs.writeFile('todos.json', JSON.stringify(todos, null, 2));
  } catch (error) {
    throw error;
  }
};

const getNextId = (todos) => {
  if (todos.length === 0) return 1;
  return Math.max(...todos.map((todo) => todo.id)) + 1;
};

app.get('/todos', async (req, res) => {
  try {
    const todos = await readTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error reading todos', error });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const newTodo = req.body;
    const todos = await readTodos();

    const nextId = getNextId(todos);
    newTodo.id = nextId;

    const updatedTodos = [...todos, newTodo];
    await writeTodos(updatedTodos);

    res.status(201).json({ message: 'Added todo', newTodo });
  } catch (error) {
    res.status(500).json({ message: 'Error adding todo', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}...`);
});
