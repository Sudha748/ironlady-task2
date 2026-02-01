let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

function displayTasks() {
    const table = document.getElementById("taskTable");
    table.innerHTML = "";

    tasks.forEach((task, index) => {
        table.innerHTML += `
            <tr>
                <td>${task.name}</td>
                <td>${task.assigned}</td>
                <td>${task.status}</td>
                <td>
                    <button class="btn edit" onclick="editTask(${index})">Edit</button>
                    <button class="btn delete" onclick="deleteTask(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const name = document.getElementById("taskName").value;
    const assigned = document.getElementById("assignedTo").value;
    const status = document.getElementById("status").value;

    if (name === "" || assigned === "") {
        alert("Please fill all fields");
        return;
    }

    if (editIndex === null) {
        tasks.push({ name, assigned, status });
    } else {
        tasks[editIndex] = { name, assigned, status };
        editIndex = null;
    }

    document.getElementById("taskName").value = "";
    document.getElementById("assignedTo").value = "";

    displayTasks();
}

function editTask(index) {
    document.getElementById("taskName").value = tasks[index].name;
    document.getElementById("assignedTo").value = tasks[index].assigned;
    document.getElementById("status").value = tasks[index].status;
    editIndex = index;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

displayTasks();
