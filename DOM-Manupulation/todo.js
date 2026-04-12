const tasks = [];

function renderTaskList() {

    const listElement = document.getElementById("task-list");

    // clear previous list
    listElement.innerHTML = "";

    tasks.forEach(task => {

        const taskElement = document.createElement("div");
        const labelElement = document.createElement("label");
        const checkboxElement = document.createElement("input");
        const taskTitleElement = document.createElement("span");
        const editBtnElement = document.createElement("button");
        const deleteBtnElement = document.createElement("button");

        checkboxElement.setAttribute("type", "checkbox");
        checkboxElement.setAttribute("id", `task-${task.id}-checkbox`);
        checkboxElement.checked = task.done;

        taskTitleElement.textContent = task.title;

        labelElement.setAttribute("for", `task-${task.id}-checkbox`);
        labelElement.appendChild(checkboxElement);
        labelElement.appendChild(taskTitleElement);

        editBtnElement.textContent = "Edit";
        deleteBtnElement.textContent = "Delete";

        // toggle done state
        checkboxElement.addEventListener("change", () => {
            task.done = checkboxElement.checked;
        });

        // delete
        deleteBtnElement.addEventListener("click", () => {
            const index = tasks.findIndex(t => t.id === task.id);
            tasks.splice(index, 1);
            renderTaskList();
        });

        taskElement.appendChild(labelElement);
        taskElement.appendChild(editBtnElement);
        taskElement.appendChild(deleteBtnElement);

        // IMPORTANT: append to DOM
        listElement.appendChild(taskElement);
    });
}

function updateTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newTitle = prompt("Edit your task:", task.title);

    if (newTitle !== null && newTitle.trim() !== "") {
        task.title = newTitle.trim();
        renderTaskList();
    }
}

function deleteTask(taskId) {
    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1) return;

    tasks.splice(index, 1);
    renderTaskList();
}


function createTask() {
    const taskCreationInputElement = document.getElementById("add-task-input");
    const taskTitle = taskCreationInputElement.value.trim();

    if (!taskTitle) return;

    const newTask = {
        id: new Date().getTime(),
        title: taskTitle,
        done: false,
    };

    tasks.push(newTask);

    taskCreationInputElement.value = "";
    renderTaskList();
}

function addListenerForTaskCreateBtn() {
    const taskCreationBtnElement = document.getElementById("task-creation-button");

    taskCreationBtnElement.addEventListener("click", () => {
        createTask();
    });
}

addListenerForTaskCreateBtn();
renderTaskList();
