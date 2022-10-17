// ******************************************
// Function to display hidden html elements
// ******************************************
function displayElement(currentId, targetId) {
    document.getElementById(currentId).style.display = "none"
    let newItem = document.getElementById(targetId)

    newItem.style.display = "flex"
    newItem.style.flexDirection = "column"
    newItem.style.justifyContent = "center"
    newItem.style.width = "40%"
    newItem.style.height = "90%"
    newItem.style.backgroundColor = "#20212C"
    newItem.style.padding = "10px"
}