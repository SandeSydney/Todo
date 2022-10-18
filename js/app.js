// Create objects to hold todos data
const todosList = []



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
    let todoTitle = document.getElementById('todoTitle').value
    let todoDescription = document.getElementById('todoDesc').value 
    let todoExpectedDate = document.getElementById('todoExpected').value
    let todoCompletedDate = document.getElementById('todoCompleted').value

    console.log(todoTitle)
    console.log(todoDescription);
    console.log(todoExpectedDate);


    // add collected data to Todos object
    todosList.push({
        title : todoTitle,
        description : todoDescription,
        expectedDate : todoExpectedDate,
        completeDate : todoCompletedDate,
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

    console.log(todosList)
}


// ************************************************
// Function to clear all children
// ************************************************
function clearChildren(){
    let prnt = document.getElementById('todoDisplay')
    for(let i =0; i<prnt.children.length;i++){
        prnt.lastChild.remove()
    }   
}


// ************************************************
//  Function to reload and view all todos
// ************************************************
function reload(){
    // first clear all the inner children
    clearChildren()
    
    // loop through the todos and for each, create a section in dom
    todosList.forEach(element=>{
        let parentDiv = document.createElement('div')
        parentDiv.className = "completeness"
        // variable to store date value
        let todoDate = element.expectedDate
        // variable to hold inner html for the todos
        let todoInnerHtml = 
        `    
            <div class="todo-items" id="incompleteTodo">
                <input onchange="" type="checkbox" name="check" id="check">
                <h6>${element.title}</h6>
                <p>(Due: <span class="dateP">${todoDate}</span>)</p>
                <i class="fa-solid fa-pen-to-square" style="color: #ffa500;"></i>
                <i class="fa-sharp fa-solid fa-trash" style="color: #ff0000;"></i>
                <p style="flex-basis: 100%; display: flex; justify-content:center;"><b>Description:&nbsp;</b>${element.description} </p>
            </div>
        `
        // modify contents of the parentDiv to accomodate innerHTML
        parentDiv.innerHTML = todoInnerHtml

        // append the created todo div to the host element
        document.getElementById('todoDisplay').appendChild(parentDiv)
    })
}