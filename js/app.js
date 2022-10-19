// Create objects to hold todos data
const todosList = []


// // ***********************************************************
// // delete todo element
// // **********************************************************
// const deleteTodo = (index) => {
//     let currentTodo = todosList[index]
    
//     console.log("Clicked Delete Btn!")

//     // reload();
// }



// ***********************************************************
// delete todo element
// **********************************************************
const todoUpdateSubmit = (index) => {
    let currentTodo = todosList[index]

    currentTodo.title = document.getElementById('updateTitle').value
    currentTodo.description = document.getElementById('updateDescription').value
    currentTodo.expectedDate = document.getElementById('updateExpected').value
    currentTodo.completeDate = document.getElementById('updateCompleted').value

    // close current view and display the update form
    displayElement('todoUpdate','todoList')

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
    let todoCompletedDate = document.getElementById('todoCompleted').value


    // add collected data to Todos object
    todosList.push({
        title: todoTitle,
        description: todoDescription,
        expectedDate: todoExpectedDate,
        completeDate: todoCompletedDate,
    })

    // Clear input fields
    document.getElementById('todoTitle').value = ''
    document.getElementById('todoDesc').value = ''
    document.getElementById('todoExpected').value = ''
    document.getElementById('todoCompleted').value = ''

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
                <input onchange="" type="checkbox" name="check" id="check">
                <h6 id="title">${element.title}</h6>
                <p id="todoDate">(Due: <span class="dateP">${todoDate}</span>)</p>
                <i onclick="updateTodo(${id})" class="fa-solid fa-pen-to-square" style="color: #ffa500;"></i>
                <i onclick="deleteTodo(${id}" class="fa-sharp fa-solid fa-trash" style="color: #ff0000;" onclick=""></i>
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
    let todoDesc = currentTodo.desc
    let todoExpected = currentTodo.expectedDate

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
                <div class="form-elem">
                    <label for="todo-update-completed-date">Completed Date:</label>
                    <input type="date" name="todo-update-completed-date" id="updateCompleted" style="width: 40%;">
                </div>
                <div class="buttons">
                    <button style="background-color: #dd571c;" onclick="displayElement('todoUpdate','todoList')">Cancel</button>
                    <button onclick="todoUpdateSubmit(${todoId})" style="background-color: #15CD72;">Update</button>
                </div>
            </div>
        `
        document.getElementById('todoUpdate').appendChild(updtParent)
    }

    
    
    // Add the inner details to the body of update form
    updtParent.innerHTML = updateInnerHtml

    // append update form to the host
    // document.getElementById('todoUpdate').appendChild(updtParent)

    console.log(updtParent);
    console.log(updateInnerHtml);


}