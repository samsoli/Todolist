//get todos from localstorage
let todos = localStorage.getItem("todos")
//try parse data or null
try {
    todos = JSON.parse(todos)
    todos = todos.length ? todos : null  /* if Array is empty equal to null */
} catch (e) {
    todos = null
}
console.log(todos)
//set defult value if todos is null
if (!todos) {
    todos = [
        { content: "study", status: true },
        { content: "to practice", status: false },
        { content: "Planning", status: true },
    ]
    localStorage.setItem("todos", JSON.stringify(todos))
}
//function to create or update todos list in ul
function createTodos(todos) {
    let todosList = document.querySelector("#todos-list")
    todosList.innerHTML = ""
    //create list tag for each todo
    todos.forEach((todo, index) => {
        let li = document.createElement("li")
        li.className = "list-group-item"
        let content = document.createElement("span")
        content.textContent = todo.content
        content.style.textDecoration = todo.status ? "initial" : "line-through"
        let deleteBtn = document.createElement("img")
        deleteBtn.src = "media/delete-20.png"
        deleteBtn.alt = "delete icon"
        deleteBtn.className = "float-right"
        //append content and deleteBtn to li
        li.append(content)
        li.append(deleteBtn)
        //append li to todosList
        todosList.append(li)
        //add deleteBtn function
        deleteBtn.addEventListener("click", e => {
            todos.splice(index, 1)
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })
        //add complete function
        content.addEventListener("click", e => {
            todos[index].status = !todos[index].status
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })

    });
}
createTodos(todos)

//add & search btns
let actions = document.querySelector("#actions")
let formWrapper = document.querySelector("#form-wrapper")
Array.from(actions.children).forEach(action => {
    if (action.dataset.action == "add") {
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
             <form  id="add">
                    <input class="form-control" name="add" placeholder="Add Todos ...">
                 </form>
                 `
            createTodos(todos)   
            //add todo
            let add = document.querySelector("#add")
            add.addEventListener("submit", e => {
                e.preventDefault()
                if (add.add.value) {
                    todos.push({ content: add.add.value, status: true })
                    localStorage.setItem("todos", JSON.stringify(todos))
                    createTodos(todos)
                    add.textContent = ''
                    

                }
            })
        })
    } else if (action.dataset.action == "search") {
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
            <form  id="search">
                    <input class="form-control" name="search" placeholder="search Todos ...">
                </form>
                `
                
            //search
            let search = document.querySelector("#search")
            search.addEventListener("keyup", e => {
                e.preventDefault()
                if (search.search.value) {
                    let filterd_todos = todos.filter(
                        todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase())
                    )
                    createTodos(filterd_todos)
                } else{
                    createTodos(todos)
                }
            })
        })
    }
})