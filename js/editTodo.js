import AddTodo from "./components/addTodo";

const action = target.dataset.action;

action === "edit" && editTodo(AddTodo);

function editTodo(id){
    AddTodo.value = todos[id].value;
    editTodo = AddTodo;
}