//Main script file

var dialogBox = document.getElementById("dialogBox");
var dialogBoxTitle = document.getElementById("dialogBoxTitle");
var dialogBoxText = document.getElementById("dialogBoxText");

function popup (title, dialog) {
	dialogBoxTitle.innerHTML() = title;
	dialogBoxText.innerHTML() = dialog;
	
	dialogBox.display = "block";
}

function popdown () {
	var dialogBox = document.getElementById("dialogBox");
	
	dialogBox.style.display = "none";
}