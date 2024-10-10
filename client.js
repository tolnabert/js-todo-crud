fetch('http://localhost:3000/todos')
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

fetch('http://localhost:3000/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'newtodo_title',
    description: 'newtodo_description',
  }),
});

fetch('http://localhost:3000/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'newtodo_title-2',
    description: 'newtodo_description-2',
  }),
});
