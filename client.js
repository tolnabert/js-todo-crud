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

async function addTodo(title, description) {
  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  try {
    const response = await fetch("http://localhost:3000/todos/" + id);
    console.log("response.status", response.status);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
}
//TEST findTodo()
// (async () => {
//   const responseMessage = await findTodo(Math.ceil(Math.random() * 8));
//   console.log("The server's response: ", responseMessage);
// })();

async function deleteTodo(id) {
  try {
    const response = await fetch("http://localhost:3000/todos/" + id, {
      method: "DELETE"
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}
//TEST deleteTodo()
// (async () => {
//   const responseMessage = await deleteTodo(Math.ceil(Math.random() * 5));
//   console.log("The server's response: ", responseMessage);
// })();

async function updateTodo(id,title, description) {
  if((title === null||title === undefined) && description === undefined){
    console.warn('Please add at least one new value for "title" or "description!"');
    return;
  }
  const dataToUpdate = {};
    if(title){dataToUpdate.title = title;};
    if(description){dataToUpdate.description = description;};
  console.log("dataToUpdate:",dataToUpdate)
  try {
    
    const response = await fetch("http://localhost:3000/todos/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToUpdate),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
}
//TEST updateTodo()
// (async () => {
//   const responseMessage = await updateTodo(2,'Being sad','Muaahhh...');
//   console.log("The server's response: ", responseMessage);
// })();
// no arguments:
// (async () => {
//   const responseMessage = await updateTodo(4);
//   console.log("The server's response: ", responseMessage);
// })();
// only title argument
// (async () => {
//   const responseMessage = await updateTodo(4,'the description stays untouched');
//   console.log("The server's response: ", responseMessage);
// })();
// only description argument
// (async () => {
//   const responseMessage = await updateTodo(5,null,'the title stays untouched');
//   console.log("The server's response: ", responseMessage);
// })();

async function findTodoBy(propertyName,propertyValue) {
  if(!propertyName||!propertyValue){
    console.warn('Please add a property name and a property value!');
    return;
  }
  const query = new URLSearchParams();    
    query.append(propertyName,propertyValue);
    
    const URL = `http://localhost:3000/todos/${propertyName === 'id'? propertyValue :'?'+query.toString()}`;
  try {
    const response = await fetch(URL);
    console.log("response.status", response.status);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
}
//TEST findTodoBy
  // find by ID
// (async () => {
//   const responseMessage = await findTodoBy('id',2);
//   console.log("The server's response: ", responseMessage);
// })();
  // find by title
// (async () => {
//   const responseMessage = await findTodoBy('title',"original title");
//   console.log("The server's response: ", responseMessage);
// })();

async function sortTodoBy(sortBy, sortOrder = 'asc') {
 
  const query = new URLSearchParams();
      query.append('sortBy',sortBy);
      query.append('sortOrder',sortOrder);
    const url = `http://localhost:3000/todos/?${query.toString()}`;
    console.log(url);
  try {
    const response = await fetch(url);
    console.log("response.status", response.status);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
}
// test sortTodoBy()
// (async () => {
// const responseMessage = await sortTodoBy('title',"desc");
// console.log("The server's response: ", responseMessage);
// })();