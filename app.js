class Task {
    constructor(id, note, checked) {
        this.id = id;
        this.note = note;
        this.checked = checked;
    }
}

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let taskList = document.getElementById('task-list');
let inputNote = document.getElementById('input-task');

for (const task of tasks) {
    appendTask(JSON.parse(task));
}

function appendTask(task) {
    let li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" ${task.checked ? 'checked' : ''} onclick="toggleTask(${task.id})">
        <span class="task">${task.note}</span>
        <button class="delete-btn" onclick="removeTask(this.parentElement, ${task.id})">X</button>`;
    taskList.appendChild(li);
}


function addTaskInDB(task) {
    tasks.push(JSON.stringify(task));
    updateTasks();
}

function addTaskBtn() {
    if (inputNote == null || inputNote.value === '') {
        return;
    }
    let id = 0;
    if (tasks.length > 0) {
        id = JSON.parse(tasks[tasks.length - 1]).id;
        id++;
    }
    let task = new Task(id, inputNote.value, false);
    appendTask(task);
    addTaskInDB(task)
    inputNote.value = '';
    inputNote.focus();
}

function removeTask(task, id) {
    task.remove();
    tasks = tasks.filter(value => {
        value = JSON.parse(value);
        return value.id !== id;
    });
    updateTasks();
}


function toggleTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        let task = JSON.parse(tasks[i])
        if (task.id === id) {
            tasks[i] = JSON.stringify(new Task(task.id, task.note, !task.checked));
            updateTasks()
            break;
        }
    }
}

function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
