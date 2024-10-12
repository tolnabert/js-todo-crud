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
    const { title } = req.query;
    const filteredTodos = title
      ? todos.filter((todo) =>
          todo.title.toLowerCase().includes(title.toLowerCase())
        )
      : todos;

    const { sortBy, sortOrder } = req.query;

    const order = sortOrder === 'desc' ? -1 : 1;

    if (sortBy === 'title') {
      filteredTodos.sort((a, b) => {
        return a.title.localeCompare(b.title) * order;
      });
    }

    return res.json(filteredTodos);

  } catch (error) {
    return res.status(500).json({ message: 'Error reading todos', error });
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const todoId = parseInt(req.params.id, 10);
    const todos = await readTodos();

    const todoIndex = todos.findIndex((todo) => todo.id === todoId);

    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const todoToFind = todos[todoIndex];
    return res.status(200).json(todoToFind);
  } catch (error) {
    return res.status(500).json({ message: 'Error reading todos', error });
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

    return res.status(201).json({ message: 'Added todo', newTodo });
  } catch (error) {
    return res.status(500).json({ message: 'Error adding todo', error });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const todoId = parseInt(req.params.id, 10);
    const todos = await readTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);

    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todos.splice(todoIndex, 1);
    await writeTodos(todos);

    return res.status(200).json({ message: 'Todo deleted', todos: todos });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting todo', error });
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const todoId = parseInt(req.params.id, 10);
    const updatedData = req.body;
    const todos = await readTodos();

    const todoIndex = todos.findIndex((todo) => todo.id === todoId);

    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todos[todoIndex] = { ...todos[todoIndex], ...updatedData };

    await writeTodos(todos);

    return res
      .status(200)
      .json({ message: 'Todo updated', todo: todos[todoIndex] });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating todo', error });

  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}...`);
});
