//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);

//functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();

    //Todo Div 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add todo to local storage
    saveLocalTodos(todoInput.value);

    //create Check button
    const completeButton = document.createElement('button');
    completeButton.innerHTML= '<i class = "fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    //create Delete button
    const DeleteButton = document.createElement('button');
    DeleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    DeleteButton.classList.add('delete-btn');
    todoDiv.appendChild(DeleteButton);

    //append the div  To List
    todoList.appendChild(todoDiv);

    //clear todoInput value
    todoInput.value = ""
}

function deleteCheck(event) {
    const item = event.target;

    //Delete the item 
    if (item.classList[0] === "delete-btn" ) {
        const todo = item.parentElement;

        //Animation before deletion
        todo.classList.toggle('fall'); 
        deleteLocalStorageTodos(todo);
        todo.addEventListener('transitionend', function(){
        todo.remove();
        });
    }

    //Check mark as complete
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

//filter todo function
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //Check todos already there
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos  = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos(){
    //Check todos already there
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos  = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
         //Todo Div 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo')

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //create Check button
    const completeButton = document.createElement('button');
    completeButton.innerHTML= '<i class = "fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    //create Delete button
    const DeleteButton = document.createElement('button');
    DeleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    DeleteButton.classList.add('delete-btn');
    todoDiv.appendChild(DeleteButton);

    //append the div  To List
    todoList.appendChild(todoDiv);

    });

}

function deleteLocalStorageTodos(todo){
      //Check todos already there
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos  = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}