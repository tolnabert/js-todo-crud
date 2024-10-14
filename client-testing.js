import { listTodos,addTodo,findTodo,deleteTodo,findTodoBy,updateTodo,sortTodoBy } from "./client.js";

//TEST listTodos()
(async () => {
  const todos = await listTodos();
  console.warn("LIST TODOS:\n",todos.message, todos);
})();

//TEST addTodo()
(async () => {
    const responseMessage = await addTodo("do nothing","Is's gonna take a lot of time");
    console.log("The server's response:", responseMessage);
  })();

  //TEST findTodo()
(async () => {
  const responseMessage = await findTodo(Math.ceil(Math.random() * 6));
  console.log("The server's response: ", responseMessage);
})();

//TEST updateTodo()
(async () => {
  const responseMessage = await updateTodo(2,'Being sad','Muaahhh...');
  console.log("The server's response: ", responseMessage);
})();
    // no arguments:
(async () => {
  const responseMessage = await updateTodo(4);
  console.log("The server's response: ", responseMessage);
})();
    // only title argument
(async () => {
  const responseMessage = await updateTodo(4,'the description stays untouched');
  console.log("The server's response: ", responseMessage);
})();
    // only description argument
(async () => {
  const responseMessage = await updateTodo(5,null,'the title stays untouched');
  console.log("The server's response: ", responseMessage);
})();

//TEST findTodoBy
  // find by ID
(async () => {
  const responseMessage = await findTodoBy('id',2);
  console.log("The server's response: ", responseMessage);
})();
  // find by title
(async () => {
  const responseMessage = await findTodoBy('title',"original title");
  console.log("The server's response: ", responseMessage);
})();

// test sortTodoBy()
(async () => {
const responseMessage = await sortTodoBy('title',"desc");
console.log("The server's response: ", responseMessage);
})();

//TEST deleteTodo()
(async () => {
  const responseMessage = await deleteTodo(Math.ceil(Math.random() * 5));
  console.log("The server's response: ", responseMessage);
})();