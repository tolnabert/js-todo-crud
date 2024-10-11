const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const PORT = 3000;

const readTodos = () => {
  const data = fs.readFileSync('todos.json');

  if (data.length === 0) return []; //.length might be not enough

  return JSON.parse(data);
};

const writeTodos = (todos) => {
  fs.writeFileSync('todos.json', JSON.stringify(todos), null, 2);
};

const getHighestId = (todos) => {
  if (todos.length === 0) return 1;
  return Math.max(...todos.map((todo) => todo.id));
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

app.post('/todos', (req, res) => {
  const newTodo = req.body;
  const todos = readTodos();

  const highestId = getHighestId(todos);

  newTodo.id = highestId;

  const updatedTodos = [...todos, newTodo];
  writeTodos(updatedTodos);
  res.status(201).json({ message: 'added todo', newTodo: newTodo });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}...`);
});
