
var userName = prompt("Please enter your name:");

if (userName) {
  userName = userName.charAt(0).toUpperCase() + userName.slice(1);
  userName = `${userName}'s`
} else {
  userName = "Your";
}

var mainHeading = document.getElementById("headingContainer");
var heading = document.createElement("h1");

heading.innerText = `${userName} Todo List`; // No apostrophe here
mainHeading.appendChild(heading);






function addTask() {
  var inputField = document.getElementById("taskInput");
  var inputValue = inputField.value.trim();

  if (inputValue !== "") {
    var li = document.createElement("li");

    var span = document.createElement("span");
    span.className = "todo-text";
    span.innerText = inputValue;

    var editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "btn-edit";
    editBtn.setAttribute("onclick", "editTask(this)");

    var delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.className = "btn-delete";
    delBtn.setAttribute("onclick", "deleteTask(this)");

    var btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);

    document.getElementById("taskList").appendChild(li);

    inputField.value = "";
  } else {
    alert("Please type something!");
  }
}

function clearAll() {
  document.getElementById("taskList").innerHTML = "";
}

function deleteTask(btn) {
  btn.closest("li").remove();
}

function editTask(btn) {
  var li = btn.closest("li");
  var span = li.querySelector(".todo-text");

  if (span) {
    var currentText = span.innerText;
    var input = document.createElement("input");
    input.type = "text";
    input.className = "todo-text";
    input.value = currentText;

    li.replaceChild(input, span);

    btn.innerText = "Save";
    btn.setAttribute("onclick", "saveTask(this)");
  }
}

function saveTask(btn) {
  var li = btn.closest("li");
  var input = li.querySelector("input.todo-text");

  var updatedText = input.value.trim();

  if (updatedText !== "") {
    var newSpan = document.createElement("span");
    newSpan.className = "todo-text";
    newSpan.innerText = updatedText;

    li.replaceChild(newSpan, input);

    btn.innerText = "Edit";
    btn.setAttribute("onclick", "editTask(this)");
  } else {
    alert("Task can't be empty!");
  }
}
