async function listTodos() {
  async function fetchTodos() {
    try {
      const response = await fetch("http://localhost:3000/todos");
      return await response.json();
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }
  return await fetchTodos();
}
//TEST listTodos()
// (async () => {
//   const todos = await listTodos();
//   console.warn("VAN-E?", todos);
// })();

async function addTodo(title,description) {
  try {
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });
    const result = await response.json();  
    return result;
    
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
}
//TEST addTodo()
// (async () => {
//   const responseMessage = await addTodo("do nothing","Is's gonna take a lot of time");
//   console.log("A szerver válasza: ", responseMessage);
// })();

async function findTodo(id) {
  const response = await fetch('http://localhost:3000/todos:'+id)
  console.log("findTodo response:", response);
}
//TEST FindTodo()
(async () => {
  const responseMessage = await findTodo(Math.ceil(Math.random()*8));
  console.log("A szerver válasza: ", responseMessage);
})();


// fetch('http://localhost:3000/todos', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     title: 'newtodo_title-2',
//     description: 'newtodo_description-2',
//   }),
// });
