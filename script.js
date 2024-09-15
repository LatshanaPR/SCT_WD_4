let tasks = [];
let totalTasks = 0;
let completedTasks = 0;

document.getElementById("add-task-btn").addEventListener("click", addTask);

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = {
        text: taskText,
        completed: false
    };
    
    tasks.push(task);
    totalTasks++;
    taskInput.value = "";
    updateTaskList();
}

function updateTaskList() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.classList.toggle("completed", task.completed);

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        const editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
        editButton.innerHTML = "✎";
        editButton.onclick = () => editTask(index);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "🗑️";
        deleteButton.onclick = () => deleteTask(index);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleComplete(index);

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });

    updateProgress();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    completedTasks = tasks.filter(task => task.completed).length;
    updateTaskList();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    totalTasks--;
    completedTasks = tasks.filter(task => task.completed).length;
    updateTaskList();
}

function editTask(index) {
    const newTaskText = prompt("Edit task", tasks[index].text);
    if (newTaskText) {
        tasks[index].text = newTaskText;
        updateTaskList();
    }
}

function updateProgress() {
    const progressBar = document.getElementById("progress-bar");
    const completedTasksDisplay = document.getElementById("completed-tasks");
    const totalTasksDisplay = document.getElementById("total-tasks");

    completedTasksDisplay.textContent = completedTasks;
    totalTasksDisplay.textContent = totalTasks;

    if (totalTasks > 0) {
        const progress = (completedTasks / totalTasks) * 100;
        progressBar.style.width = progress + "%";
    } else {
        progressBar.style.width = "0%";
    }
}
