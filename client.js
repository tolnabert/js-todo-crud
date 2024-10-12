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
//TEST
(async () => {
  const todos = await listTodos();
  console.warn("VAN-E?", todos);
})();

// function listTodos(){
// fetch('http://localhost:3000/todos')
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     return data;
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// }

// fetch('http://localhost:3000/todos', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     title: 'newtodo_title',
//     description: 'newtodo_description',
//   }),
// });

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
