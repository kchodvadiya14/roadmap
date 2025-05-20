let tasks = [];

const newTaskInput = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('add-task-button');
const tasksList = document.getElementById('tasks-list');

// Function to render tasks to the DOM
function renderTasks() {
    // Clear current list
    tasksList.innerHTML = '';

    // Sort tasks: completed tasks at the end
    const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

    sortedTasks.forEach(task => {
        const listItem = document.createElement('li');
        if (task.completed) {
            listItem.classList.add('completed');
        }

        listItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
            <span class="task-text">${task.description}</span>
            <button class="delete-button" data-id="${task.id}">🗑️</button>
        `;

        // Add event listeners
        listItem.querySelector('input[type="checkbox"]').addEventListener('change', toggleComplete);
        listItem.querySelector('.delete-button').addEventListener('click', deleteTask);

        tasksList.appendChild(listItem);
    });
}

// Function to add a new task
function addTask() {
    const taskDescription = newTaskInput.value.trim();
    if (taskDescription !== '') {
        const newTask = {
            id: Date.now(), // Unique ID
            description: taskDescription,
            completed: false
        };
        tasks.push(newTask);
        newTaskInput.value = ''; // Clear input
        renderTasks();
    }
}

// Function to toggle task completion
function toggleComplete(event) {
    const taskId = parseInt(event.target.dataset.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(event) {
    const taskId = parseInt(event.target.dataset.id);
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Event listeners for adding tasks
addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks(); 