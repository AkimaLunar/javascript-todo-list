
var taskInput = document.getElementById('new-task');

var addButton = document.getElementsByTagName('button')[0];
var incompletedTasksHolder = document.getElementById('incomplete-tasks');
var completedTasksHolder = document.getElementById('completed-tasks');

var createNewTaskElement = function(taskString) {

	//creating all elements
	var listItem = document.createElement('li');
		var checkBox = document.createElement('input');
		var label = document.createElement('label');
		var editInput = document.createElement('input');
		var editButton = document.createElement('button');
		var deleteButton = document.createElement('button');

	//modifying elements
	checkBox.type = 'checkbox';
	editInput.type = 'text';
	editButton.innerText = 'Edit';
	editButton.className = 'edit';
	deleteButton.innerHTML = 'Delete';
	deleteButton.className = 'delete';
	label.innerText = taskString;


	//appending all elements into a list element
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
};

//Adding a new task
var addTask = function (){
	console.log('Adding task...');
	//creating a new list item with the text from #new-task
	if (taskInput.value === "") {
		console.log('empty');
	} else {
	var listItem = createNewTaskElement(taskInput.value);
	//appending listItem to incomleteTasksHolder
	incompletedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

	taskInput.value = '';
	}
};

//Editing an existing tasks
var editTask = function(){
	console.log('Editing task...');
	var listItem = this.parentNode;
	var editInput = listItem.querySelector('input[type=text]');
	var editButton = listItem.querySelector('button.edit');
	var label = listItem.querySelector('label');

	//checking if the the parent has .editMode class
	var containsClass = listItem.classList.contains('editMode');
	if (containsClass) {
		//label text becomes the input's value
		label.innerText = editInput.value;
		editButton.innerText = 'Edit';
	} else {
		//label text becomes the input's value
		editInput.value = label.innerText;
		editButton.innerText = 'Save';
	}

	//toggling .editMode
	listItem.classList.toggle('editMode');
};

//Deleting an existing tasks
var deleteTask = function(){
	console.log('Delete task…');
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	//remove the list item form the list
	ul.removeChild(listItem);
};

//Marking a task as complete
var taskComplete = function(){
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
	console.log('Completing task...');
};

//Marking a task as incomplete
var taskIncomplete = function(){
	var listItem = this.parentNode;
	incompletedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskComplete);
	console.log('Incomplete task...');
};

//Binding events

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
	//select taskListItem's children
	var checkBox = taskListItem.querySelector('input[type=checkbox');
	var editButton = taskListItem.querySelector('button.edit');
	var deleteButton = taskListItem.querySelector('button.delete');

	//bind editTask to edit button
	editButton.onclick = editTask;
	//bind deleteTask to delete button
	deleteButton.onclick = deleteTask;
	//bind checkBoxEventHandler to checkbox
	checkBox.onchange = checkBoxEventHandler;

};

//Set the click handler to the addTask function
addButton.addEventListener('click', addTask);

//Cycle over incompletedTasksHolder ul list items
for (var i = 0; i < incompletedTasksHolder.children.length; i++) {
	bindTaskEvents(incompletedTasksHolder.children[i], taskComplete);
}

//Cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}