//Selectors
const todoinput = document.querySelector('.todo-input')
const todobtn = document.querySelector('.todo-btn')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector(".filter-todos")

//event listeners
document.addEventListener("DOMContentLoaded",getTodos)
todobtn.addEventListener('click',addTodo)
todoList.addEventListener('click',deletecheck)
filterOption.addEventListener('click',filterTodo)









//functions
 
function addTodo(){
    //prevent from submitting
    event.preventDefault()    
    //todo div
    const tododiv = document.createElement("div")
    tododiv.classList.add('todo');
    //create li
    const newtodo = document.createElement("li")
    newtodo.innerText = todoinput.value
    newtodo.classList.add('todo-item')
    tododiv.appendChild(newtodo)

    //add todo to local storage
    saveLocalTodos(todoinput.value)

    //completed button
    const completedbtn = document.createElement("button")
    completedbtn.innerHTML='<i class="fas fa-check"></i>'
    completedbtn.classList.add("complete-btn")
    tododiv.append(completedbtn)
    //TRASH
    const trashbtn = document.createElement("button")
    trashbtn.innerHTML='<i class="fas fa-trash"></i>'
    trashbtn.classList.add("trash-btn")
    tododiv.append(trashbtn)
    //APEND TO LIST
    todoList.appendChild(tododiv)
    // CLear todo input value
    todoinput.value=""
}



function deletecheck(e){
    const item = e.target
    //delete
    if (item.classList[0]==='trash-btn'){
        const todo = item.parentElement
        //animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener('transitionend',function(){
        todo.remove()
        })
    }
    //checkmark
    if(item.classList[0]==='complete-btn'){
    const todo = item.parentElement
    todo.classList.toggle("completed")
   }
}



function filterTodo(e){
   
    const todos = document.getElementsByClassName('todo');
    const todosArray = [...todos]
    console.log(todosArray)
    todosArray.forEach(function(todo){
        switch(e.target.value){
             case "all":
                 console.log("in all")
                 todo.style.display="flex"
             break;
             case "completed":
             if(todo.classList.contains("completed")){
                 todo.style.display="flex"
    
             }
             else{
                 todo.style.display = "none"
             }
             break;
             case "uncompleted":
                 if(!todo.classList.contains('completed')){
                     todo.style.display = "flex"
                 }
                 else{
                     todo.style.display = "none"
                 }
            break;
         }
    })
}


function saveLocalTodos(todo){
    //check for todos in localstorage
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[]
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))
}


function getTodos(){
    console.log("hello");
    //check for todos in localstorage
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[]
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
    //todo div
    const tododiv = document.createElement("div")
    tododiv.classList.add('todo');
    //create li
    const newtodo = document.createElement("li")
    newtodo.innerText = todo 
    newtodo.classList.add('todo-item')
    tododiv.appendChild(newtodo) 
    //completed button
    const completedbtn = document.createElement("button")
    completedbtn.innerHTML='<i class="fas fa-check"></i>'
    completedbtn.classList.add("complete-btn")
    tododiv.append(completedbtn)
    //TRASH
    const trashbtn = document.createElement("button")
    trashbtn.innerHTML='<i class="fas fa-trash"></i>'
    trashbtn.classList.add("trash-btn")
    tododiv.append(trashbtn)
    //APEND TO LIST
    todoList.appendChild(tododiv)        
    })
}


function removeLocalTodos(todo){
    //check for todos in localstorage
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[]
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex =  todo.children[0].innerText
    console.log(todoIndex);
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem('todos',JSON.stringify(todos))
}

