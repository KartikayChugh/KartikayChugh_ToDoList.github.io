/* (Step 1)
1.) Placing DOM content loaded onto the website and select form elements using id.
2.) Adding event listener to form to listen for submit. 
3.) Validate inputs.
4.) Call function to add a new todo item.
5.) Save the updated todo list to local storage.
6.) Reset form fields.
*/

document.addEventListener("DOMContentLoaded", function(){
        // From card 1 :
    const todoForm = document.getElementById("todoForm");
    const taskNameInput = document.getElementById("taskName");
        // From card 2 :
    const todoList = document.getElementById("todoList");

        // Load saved to-do list from local storage :
    loadTodoList();

    // Event listner on todoForm for submit :
    todoForm.addEventListener("submit", function (event){
        // We prevent default so that the form doesnt reload itself :
        event.preventDefault();

        // Now we validate our inputs to see if both are entered or not :
        const taskName = taskNameInput.value.trim(); // trim 
        if(taskName === ""){
            alert("Please enter both task name.");
        }

        // Call function to add a new todoItem :
        addTodoItem(taskName);

        // Save todo list to local storage :
        saveTodoList();

        // Reset todoForm :
        todoForm.reset();
    });




    /* (Step 2)
    AddTodoItem function :
    */
    function addTodoItem(taskName) {
        // Create the listItem element :
        const listItem = document.createElement("li");
        // Add bootstrap classes to our listItem element :
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        // Text content of our listItem is our taskName :
        listItem.textContent = taskName;

        // Create a delete button for the task only after at-least a single task is created :
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.textContent = "Delete";

        // Add event listener to the delete button
        deleteButton.addEventListener("click", function() {
            listItem.remove();
            saveTodoList();
        });

        /* Append the delete button to the list item, 
        This line of code appends the deleteButton element as a child of the listItem element.
        We do this so that each list item has a separate delete button. */
        listItem.appendChild(deleteButton);

        // Append the list item to the to-do list, to append the list item into our todoList :
        todoList.appendChild(listItem);
    }




    // (Step 3)
    // Function to save the to-do list to local storage
    function saveTodoList() {
        // Create an array to store all the tasks in :
        const tasks = [];
        // Loop through each list item (<li>) in the to-do list :
        todoList.querySelectorAll("li").forEach(function(item) {
            // Extract and store the text content of each task
            tasks.push(item.firstChild.textContent);
        });
        /* Convert the tasks array to JSON and save to local storage in the users browser.
         This line converts the tasks array into a JSON string using JSON.stringify. 
         It then saves this JSON string to the browser's local storage under the key "todoList". : */
        localStorage.setItem("todoList", JSON.stringify(tasks));
    }



    // (Step 4)
    // Function to load the to-do list from local storage :
    function loadTodoList() {
        // Retrieve and parse tasks to convert JSON back to JS array :
        const tasks = JSON.parse(localStorage.getItem("todoList")) || [];
        // Loop, for each task that we find that was previously stored we add it to our todo list
        tasks.forEach(function(task) {
            addTodoItem(task);
        });
    }



});



