//Main script file

var dialogBox = document.getElementById("dialogBox");
var dialogBoxTitle = document.getElementById("dialogBoxTitle");
var dialogBoxText = document.getElementById("dialogBoxText");

function popup (title = "Dialog Title", dialog = "Dialog Text") {
	dialogBoxTitle.innerHTML = title;
	dialogBoxText.innerHTML = dialog;
	
	dialogBox.style.display = "block";
}

function popdown () {
	var dialogBox = document.getElementById("dialogBox");
	
	dialogBox.style.display = "none";
}