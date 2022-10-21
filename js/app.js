// Create objects to hold todos data
const todosList = JSON.parse(localStorage.getItem('todosList')) || []

// Varible to hold complete todos
const completedTodos = JSON.parse(localStorage.getItem('completedTodos')) || []


// **********************************************************
// Function to listen to complete button
// **********************************************************
const completeListener = (index)=>{
    // find the todo marked as complete
    let todoCompleted = todosList.splice(index, 1)
    // save change from the todoList
    localStorage.setItem("todosList", JSON.stringify(todosList))
    // Add the todo to the list with completed todos
    completedTodos.push(...todoCompleted)
    // save the completed tasks
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos))

    console.log("Here you are!");
    
    reload()
    reloadCompleted()
}


// **********************************************************
// Function to listen to uncomplete button
// **********************************************************
const uncompleteListener = (index)=>{
    // find the todo marked as complete
    let todoUncompleted = completedTodos.splice(index, 1)
    // save change from the todoList
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos))
    // Add the todo to the todo list end
    todosList.push(...todoUncompleted)
    // save the completed tasks
    localStorage.setItem("todosList", JSON.stringify(todosList))
    
    reload()
    reloadCompleted()
}


// **********************************************************
//  Function to display the completed todos
// **********************************************************
const reloadCompleted = ()=>{
    // first clear all the inner children
    let clearChildren = ()=> {
        let prnt = document.getElementById('completeTodo')
        for (let i = 0; i = prnt.children.length; i++) {
            prnt.lastChild.remove()
        }
    }
    clearChildren()

    // Check for contents of the todo list and if empty return message
    if(completedTodos.length == 0){
        let msg = document.createElement("p")
        msg.style.textAlign = 'center'
        msg.style.margin = "10px"
        msg.id = "noCompleted"
        msg.innerHTML = `No tasks completed. Create one from above.`
        document.getElementById('completeTodo').appendChild(msg)
    }

    // loop through the completed todos and for each, create a section in dom
    completedTodos.forEach((element,id) => {
        let parentDiv = document.createElement('div')
        parentDiv.className = "completeness"
        // variable to store date value
        let todoDate = new Date(element.expectedDate)
        // Capture the submitted date
        let dateSubmitted = new Date()


        // *******************************************
        // Calculate difference in days of submission
        // *******************************************
        const daysDifference = ()=>{
            // get difference in milliseconds then convert to days
            let differenceMilli = todoDate.getTime() - dateSubmitted.getTime()
            let differenceDays = Math.ceil(differenceMilli / (1000*60*60*24))

            // Return message to DOM about timeliness of message
            if(differenceDays > 0 ){
                return `Task completed ${differenceDays} days early.`
            } else if(differenceDays < 0){
                return `Task completed ${differenceDays*-1} days late.`
            } else{
                return `Task completed on time`
            }
        }


        // variable to hold inner html for the todos
        let childDiv = document.createElement("div")
        childDiv.className = "todo-complete"
        childDiv.id = "clearedTodo"
        parentDiv.appendChild(childDiv)
        let todoInnerHtml =
            `    
                <button class="uncomplete" onclick="uncompleteListener(${id})">Mark As Incomplete</button>
                <h6 id="title">${element.title}</h6>
                <!-- <p id="todoDate">(Due: <span class="dateP">${todoDate}</span>)</p>
                <i onclick="updateTodo(${id})" class="fa-solid fa-pen-to-square" style="color: #ffa500;"></i> -->
                <i onclick="deleteTodo(this,${id})" class="fa-sharp fa-solid fa-trash" style="color: #ff0000;"></i>
                <p id="desc" style="flex-basis: 100%; display: flex; justify-content:center;"><b>Description:&nbsp;</b>${element.description} </p>
                <p id="completedMessage" style="flex-basis: 100%; display: flex; justify-content:center;">${daysDifference()}</p>
            `
        // modify contents of the parentDiv to accomodate innerHTML
        childDiv.innerHTML = todoInnerHtml

        // append the created todo div to the host element
        document.getElementById('completeTodo').appendChild(parentDiv)

    })
}



// ***********************************************************
// delete one todo element
// **********************************************************
const deleteTodo = (element,index) => {
    element.parentElement.parentElement.remove()

    todosList.splice(index, 1);
    completedTodos.splice(index, 1);


    localStorage.setItem("todosList", JSON.stringify(todosList));
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));


    reload()
    reloadCompleted()
}



// ***********************************************************
// delete all todo elements
// **********************************************************
const deleteAll = () => {
    todosList.forEach((index)=>{
        todosList.splice(index, todosList.length);
        localStorage.setItem("todosList", JSON.stringify(todosList));
    })
    completedTodos.forEach((index)=>{
        completedTodos.splice(index, completedTodos.length);
        localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
    })
    
    reload()
    reloadCompleted()
}



// ***********************************************************
// Update todo element
// **********************************************************
const todoUpdateSubmit = (index) => {
    if(!document.getElementById('updateTitle').value.trim()){
        alert('Enter a title todo');
        return;
    } else if(!document.getElementById('updateExpected').value.trim()){
        alert('A date is required');
        return;
    }
    let currentTodo = todosList[index]

    currentTodo.title = document.getElementById('updateTitle').value
    currentTodo.description = document.getElementById('updateDescription').value
    currentTodo.expectedDate = document.getElementById('updateExpected').value

    // close current view and display the update form
    displayElement('todoUpdate','todoList')

    localStorage.setItem("todosList", JSON.stringify(todosList));

    reload();
}




// ******************************************
// Function to display hidden html forms
// ******************************************

function displayElement(currentId, targetId) {
    document.getElementById(currentId).style.display = "none"
    let newItem = document.getElementById(targetId)

    newItem.style.width = "40%"
    newItem.style.display = "flex"
    newItem.style.flexDirection = "column"
    newItem.style.justifyContent = "center"
    newItem.style.height = "90%"
    newItem.style.backgroundColor = "#20212C"
    newItem.style.padding = "10px"
    newItem.style.gap = "20px"
}



// ***************************************************
// Function to collect data from form and update todo
// ***************************************************
function addData() {
    if(!document.getElementById('todoTitle').value.trim()){
        alert('You must enter a title');
        return;
    } else if(!document.getElementById('todoExpected').value.trim()){
        alert('You must enter a date');
        return;
    }
    let todoTitle = document.getElementById('todoTitle').value
    let todoDescription = document.getElementById('todoDesc').value
    let todoExpectedDate = document.getElementById('todoExpected').value


    // add collected data to Todos object
    todosList.push({
        title: todoTitle,
        description: todoDescription,
        expectedDate: todoExpectedDate,
    })

    // Push collected data to the local storage
    localStorage.setItem("todosList", JSON.stringify(todosList));

    // Clear input fields
    document.getElementById('todoTitle').value = ''
    document.getElementById('todoDesc').value = ''
    document.getElementById('todoExpected').value = ''

    console.log(todosList);

    // switch back to main window
    displayElement('todoAdd', 'todoList')

    // reload the todos
    reload()
}


// ************************************************
// Function to clear all children
// ************************************************
function clearChildren() {
    let prnt = document.getElementById('todoDisplay')
    for (let i = 0; i = prnt.children.length; i++) {
        prnt.lastChild.remove()
    }
}


// ************************************************
//  Function to reload and view all todos
// ************************************************
function reload() {
    // first clear all the inner children
    clearChildren()

    // Check for contents of the todo list and if empty return message
    if(todosList.length == 0){
        let msg = document.createElement("p")
        msg.style.textAlign = 'center'
        msg.style.margin = "10px"
        msg.id = "noTodos"
        msg.innerHTML = `Hi, Kindly click the plus (+) above to add a todo item`
        document.getElementById('todoDisplay').appendChild(msg)
    }
    // loop through the todos and for each, create a section in dom
    todosList.forEach((element,id) => {

        let parentDiv = document.createElement('div')
        parentDiv.className = "completeness"
        // variable to store date value
        let todoDate = element.expectedDate
        // variable to hold inner html for the todos
        let childDiv = document.createElement("div")
        childDiv.className = "todo-items"
        childDiv.id = "incompleteTodo"
        parentDiv.appendChild(childDiv)
        let todoInnerHtml =
            `    
                <button class="complete" onclick="completeListener(${id})">Done</button>
                <h6 id="title">${element.title}</h6>
                <p id="todoDate">(Due: <span class="dateP">${todoDate}</span>)</p>
                <i onclick="updateTodo(${id})" class="fa-solid fa-pen-to-square" style="color: #ffa500;"></i>
                <i onclick="deleteTodo(this,${id})" class="fa-sharp fa-solid fa-trash" style="color: #ff0000;"></i>
                <p id="desc" style="flex-basis: 100%; display: flex; justify-content:center;"><b>Description:&nbsp;</b>${element.description} </p>
            `
        // modify contents of the parentDiv to accomodate innerHTML
        childDiv.innerHTML = todoInnerHtml

        // append the created todo div to the host element
        document.getElementById('todoDisplay').appendChild(parentDiv)

    })

    
}

// ************************************************
//  Function to update selected todos
// ************************************************
const updateTodo = (id) => {
    let todoId = id
    let currentTodo = todosList[todoId]

    // collect form variables from todo list
    let todoTitle = currentTodo.title
    let todoDesc = currentTodo.description
    let todoExpected = currentTodo.expectedDate

    console.log(todoDesc);

    let updateInnerHtml = ''
    let updtParent = ''

    // close current view and display the update form
    displayElement('todoList', 'todoUpdate')

    if(!document.getElementById('todoFrame')){

        // create body of the update form
        updtParent = document.createElement("div")
        console.log(updtParent);
        updtParent.className = "todo-frame"
        updtParent.id = "todoFrame"

        updateInnerHtml = 
        `
            <div class="form">
                <div class="form-elem">
                    <label for="todo-update-title">Title:</label>
                    <input type="text" name="todo-title" id="updateTitle" placeholder="Type in title..." value="${todoTitle}">
                </div>
                <div class="form-elem">
                    <label for="todo-update-description">Description:</label>
                    <textarea name="todo-description" id="updateDescription" rows="5" cols="30">
                    ${todoDesc}
                    </textarea>
                </div>
                <div class="form-elem">
                    <label for="todo-update-expected-date">Expected Completion Date:</label>
                    <input type="date" name="todo-update-expected-date" id="updateExpected" style="width: 40%;" value="${todoExpected}">
                </div>
                <div class="buttons">
                    <button class="btn" style="background-color: #dd571c;" onclick="displayElement('todoUpdate','todoList')">Cancel</button>
                    <button class="btn" onclick="todoUpdateSubmit(${todoId})" style="background-color: #15CD72;">Update</button>
                </div>
            </div>
        `
        document.getElementById('todoUpdate').appendChild(updtParent)
    }

    
    
    // Add the inner details to the body of update form
    updtParent.innerHTML = updateInnerHtml

}  

// Whenever the browser window loads
window.onload = () => {
    reload()
    reloadCompleted()
}