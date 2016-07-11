/**
 * @author  Miguel Fonseca
 * @version 1.0, 12/07/16
 */

//TODO avoid global var
var totalItems =0;

window.onload = function() {
	document.getElementById("inItemText").focus();
}

function isEmpty(str) {
	return str.replace(/^\s+|\s+$/gm,'').length == 0;
}

function updateItemState() {
	var cbId = this.id.replace("cb_", "");

	var itemText = document.getElementById("item_" + cbId);
	var listItem = document.getElementById("li_" + cbId);

	if (this.checked) {
		itemText.className = "checkedText";
		listItem.className = "checkedList";
	} else {
		itemText.className = "";
		listItem.className = "";
	}
}

function renameItem() {
	//TODO prompts are bad
	var newText = prompt("New task name: ");
	
	if (isEmpty(newText)) {
		return false;
	}

	this.innerText = newText;

	document.getElementById("inItemText").focus();
}

function removeItem() {
	if(confirm("Do you want to remove this task?")) {
		var spanId = this.id.replace("item_", "");
		document.getElementById("li_" + spanId).style.display = "none";
	}
	document.getElementById("inItemText").focus();
	return false;
}

function addItem(list, itemText) {
	if(totalItems < 24) {

		totalItems++;

		var listItem = document.createElement("li");
		listItem.id = "li_" + totalItems;

		var checkBox = document.createElement("input");
		checkBox.type = "checkbox";
		checkBox.id = "cb_" + totalItems;

		checkBox.onclick = updateItemState;

		var span = document.createElement("span");
		span.id = "item_" + totalItems; 
		span.innerText = itemText;
	
		// right click to remove
		span.oncontextmenu = removeItem;
		//double click to rename
		span.ondblclick = renameItem;
	
		listItem.appendChild(checkBox);
		listItem.appendChild(span);
		list.appendChild(listItem);
	}
}

function addItemButton() {
	var inItemText = document.getElementById("inItemText");
	var itemText = inItemText.value;

	if(isEmpty(itemText)) {
			return false;
	} else {
		addItem(document.getElementById("todoList"), itemText);
		// clean input box
		inItemText.focus();
		inItemText.value='';
	}
}

inItemText.onkeyup = function(event) {
	var inItemText = document.getElementById("inItemText");

	// 13 = enter key
	if(event.which == 13) { 
		var itemText = inItemText.value;

		if(isEmpty(itemText)) {
			return false;
		} else {
			addItem(document.getElementById("todoList"), itemText);
			// clean input box
			inItemText.focus();
			inItemText.value='';
		}	
	}
};


