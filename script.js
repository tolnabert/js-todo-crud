const root = document.getElementById("root");
const listTodosBtn = document.getElementById("list-todos-btn");

const data = JSON.parse('[{"title":"newtodo_title1","description":"newtodo_description","id":1},{"title":"newertodo_title","description":"newtodo_description","id":2},{"title":"newtodo_title","description":"newtodo_description","id":3},{"title":"newtodo_title","description":"newtodo_description","id":4},{"title":"newtodo_title","description":"newtodo_description","id":5},{"title":"newtodo_title","description":"newtodo_description","id":6},{"title":"newtodo_title","description":"newtodo_description","id":7},{"title":"newtodo_title","description":"newtodo_description","id":8},{"title":"newtodo_title","description":"newtodo_description","id":9},{"title":"newtodo_title","description":"newtodo_description","id":10}]');

async function listTodos(){ // this is a dummy server response
    function waitingForResponse(){
        return new Promise((resolve,_reject)=>{
        setTimeout(() => {
            resolve(data);
        }, 1000);})
    }
    const result = await waitingForResponse();    
    todoLister(result);
}

function deleteTodo(){
    // const data = server calling function 
    todoLister(data);
}

function todoLister(data) {
    root.innerHTML = '';

    const todoListItems = data.map(todo => {
        const toDoLi = new Component('li',{id:`todo-li-${todo.id}`,class:"todo-list"}).node;
        const delBtn = new Component('button',{class:"delete-button",title:"delete"},[document.createTextNode("X")],{"click":()=>{root.removeChild(toDoLi)}}).node;
        const toDoTitle = new Component('span',{class:"bold"},[document.createTextNode(todo.title)]).node;
        toDoLi.append(
            toDoTitle,
            document.createTextNode(todo.description),
            delBtn
        );
        return toDoLi;
    })    
    root.append(...todoListItems);
}   


listTodosBtn.addEventListener('click',()=>{
    listTodos();
})

class Component {
    constructor(tag = "div", attributes = {}, children = [], listenerObj) {
      this.tag = tag;
      this.attributes = attributes;
      this.children = children;
      this.listener = listenerObj; // {'click': ()=>{}}
      this.node = this.render(); // Only for developing reasons
    }
    
    render() {
      const node = document.createElement(this.tag);
      Object.keys(this.attributes).forEach((attrKey) =>
        node.setAttribute(attrKey, this.attributes[attrKey])
      );
      if (this.children && this.children.length) {
        this.children.forEach((child) => node.append(child));
      }
  
      if (this.listener) {
        Object.keys(this.listener).forEach((eventName) =>
          node.addEventListener(eventName, this.listener[eventName])
        );
      }
  
      return node;
    }
  }
  