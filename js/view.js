import AddTodo from "./components/addTodo.js";
//import AddTodo from "./editTodo";


export default class View {
  constructor() {
    this.model = null;
    this.table = document.getElementById('table');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');

    this.addTodoForm = new AddTodo();

    this.addTodoForm.onClick((title, description) => this.addTodo(title, description));
  }

  editId= -1;

  setModel(model) {
    this.model = model;
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo));
  }

  addTodo(title, description) {
    
    if (this.editId == -1){
      console.log('yyy');
      const todo = this.model.addTodo(title, description);
    this.createRow(todo);
    }else {
      console.log('xxx');
    this.model.editTodo(this.editId, title,description);
    this.editrow(this.editId, title, description);
    document.getElementById('add').textContent = "Add"
    
    this.editId= -1;
    }
  // const todo = this.model.addTodo(title, description);
    document.getElementById('description').value= "";
    document.getElementById('title').value= "";
    //this.createRow(todo);
    //this.render;
  }
  

  createRow(todo) {
    const row = this.table.insertRow();
    row.setAttribute('id', todo.id);
    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td class="text-center"></td>
      <td class="text-right"></td>
    `;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onClick = () => this.toggleCompleted(todo.id);
    row.children[2].appendChild(checkbox);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
    removeBtn.innerHTML = ` <i class="fa fa-trash"></i>`;
    removeBtn.onclick = () => this.removeTodo(todo.id);
    row.children[3].appendChild(removeBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-warning', 'mb-1', 'ml-1');
    editBtn.innerHTML = ` <i class="fa fa-edit"></i>`;
    editBtn.onclick = () => this.editTodo(todo.id, todo.title, todo.description);
    row.children[3].appendChild(editBtn);
  }

  toggleCompleted(id) {
    this.model.toggleCompleted(id);
  }

  removeTodo(id) {
    this.model.removeTodo(id);
    document.getElementById(id).remove();
  }
  editrow(id , title, description){
    let row = document.getElementById(id);
    row.children[0].innerText = title;
    row.children[1].innerText = description;
  }

  editTodo(id, title , description){
    //console.log(title);
    //console.log(description);
    // let row = document.getElementById('id');
    // row . children[0].innerText = title;
    // row . children[1].innerText = des;

    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    document.getElementById('add').textContent = "Update";
    this.editId = id;
  }
}