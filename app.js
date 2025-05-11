var firebaseConfig = {
  apiKey: "AIzaSyBphIOv0XFDE0AJORVO7dRSnnYnj2ABdXk",
  authDomain: "todo-app-ce884.firebaseapp.com",
  databaseURL: "https://todo-app-ce884-default-rtdb.firebaseio.com", // ✅ ADD THIS LINE
  projectId: "todo-app-ce884",
  storageBucket: "todo-app-ce884.appspot.com",
  messagingSenderId: "68439117018",
  appId: "1:68439117018:web:21b3dcb792e181b12ce9e3",
};

var app = firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Get user name and set heading
var userName = prompt("Please enter your name:");

if (userName) {
  userName = userName.charAt(0).toUpperCase() + userName.slice(1);
  userName = `${userName}'s`;
} else {
  userName = "Your";
}

var mainHeading = document.getElementById("headingContainer");
var heading = document.createElement("h1");
heading.innerText = `${userName} Todo List`;
mainHeading.appendChild(heading);

// Load tasks from Firebase when the page loads
database.ref("tasks").on("value", function (snapshot) {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  snapshot.forEach(function (childSnapshot) {
    var taskId = childSnapshot.key;
    var taskData = childSnapshot.val();

    var li = document.createElement("li");

    var span = document.createElement("span");
    span.className = "todo-text";
    span.innerText = taskData.text;

    var editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "btn-edit";
    editBtn.setAttribute("onclick", `editTask(this, '${taskId}')`);

    var delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.className = "btn-delete";
    delBtn.setAttribute("onclick", `deleteTask('${taskId}')`);

    var btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);

    taskList.appendChild(li);
  });
});

// Add a new task
function addTask() {
  var inputField = document.getElementById("taskInput");
  var inputValue = inputField.value.trim();

  if (inputValue !== "") {
    var taskId = Date.now();
    database.ref("tasks/" + taskId).set({
      text: inputValue,
    });
    inputField.value = "";
  } else {
    alert("Please type something!");
  }
}

// Delete a task from Firebase
function deleteTask(taskId) {
  database.ref("tasks/" + taskId).remove();
}

// Edit a task
function editTask(btn, taskId) {
  var li = btn.closest("li");
  var span = li.querySelector(".todo-text");

  var input = document.createElement("input");
  input.type = "text";
  input.className = "todo-text";
  input.value = span.innerText;

  li.replaceChild(input, span);

  btn.innerText = "Save";
  btn.setAttribute("onclick", `saveTask(this, '${taskId}')`);
}

// Save the edited task to Firebase
function saveTask(btn, taskId) {
  var li = btn.closest("li");
  var input = li.querySelector("input.todo-text");
  var updatedText = input.value.trim();

  if (updatedText !== "") {
    database.ref("tasks/" + taskId).update({
      text: updatedText,
    });
  } else {
    alert("Task can't be empty!");
  }
}

// Clear all tasks
function clearAll() {
  database.ref("tasks").remove();
}
