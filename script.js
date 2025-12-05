let tasks = [];
let taskId = 1;


const form = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const priorityInput = document.getElementById("taskPriority");
const importantInput = document.getElementById("taskImportant");
const completedInput = document.getElementById("taskCompleted");
const taskManagerDiv = document.getElementById("taskmanager");


form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (taskNameInput.value.trim() === "") {
        alert("Task name cannot be empty!");
        return;
    }

    const newTask = {
        id: taskId++,
        name: taskNameInput.value,
        priority: priorityInput.value,
        isImportant: importantInput.checked,
        isCompleted: completedInput.checked,
        date: new Date().toLocaleString()
    };

    tasks.push(newTask);
    console.log(JSON.stringify(tasks));

    renderTasks();
    form.reset();
});


function renderTasks() {
    taskManagerDiv.innerHTML = "";

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");


        if (task.priority === "High") taskDiv.style.borderLeftColor = "red";
        if (task.priority === "Medium") taskDiv.style.borderLeftColor = "orange";
        if (task.priority === "Low") taskDiv.style.borderLeftColor = "green";

        taskDiv.innerHTML = `
            <div class="info">

  
                <span class="star ${task.isImportant ? "important" : "not-important"}"
                      onclick="toggleImportant(${task.id})">
                      ${task.isImportant ? "⭐" : "☆"}
                </span>


                <p ${task.isCompleted ? 'style="text-decoration: line-through; opacity: 0.6;"' : ""}>
                    <strong>${task.name}</strong>

                    <span class="badge 
                        ${task.priority === "High" ? "badge-high" :
                         task.priority === "Medium" ? "badge-medium" :
                         "badge-low"}">

                        ${task.priority === "High" ? "🔥" :
                          task.priority === "Medium" ? "⚠️" :
                          "💤"}
                        ${task.priority}
                    </span>
                </p>

                <p>Added: ${task.date}</p>
            </div>

            <div class="actions">
                <input type="checkbox" ${task.isCompleted ? "checked" : ""} 
                       onclick="toggleComplete(${task.id})">

                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskManagerDiv.appendChild(taskDiv);
    });
}


function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    task.isCompleted = !task.isCompleted;

    console.log(JSON.stringify(tasks));
    renderTasks();
}


function toggleImportant(id) {
    const task = tasks.find(t => t.id === id);
    task.isImportant = !task.isImportant;

    console.log(JSON.stringify(tasks));
    renderTasks();
}


function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);

    console.log(JSON.stringify(tasks));
    renderTasks();
}