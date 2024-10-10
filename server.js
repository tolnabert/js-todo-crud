const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const PORT = 3000;

const readTodos = () => {
  try {
    const data = fs.readFileSync('todos.json');
    console.log(JSON.parse(data));

    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const writeFile = (todos) => {
  fs.writeFileSync('todos.json', JSON.stringify(todos), null, 2);
};

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}...`);
});
