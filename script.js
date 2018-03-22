//Main script file

var dialogBox = document.getElementById("dialogBox");
var dialogBoxTitle = document.getElementById("dialogBoxTitle");
var dialogBoxText = document.getElementById("dialogBoxText");

function popup (title = "Dialog Title", dialog = "Dialog Text") {
	dialogBoxTitle.innerHTML = title;
	dialogBoxText.innerHTML  = dialog;
	
	dialogBox.style.display = "block";
}

function popdown () {
	var dialogBox = document.getElementById("dialogBox");
	
	dialogBox.style.display = "none";
}

function trackoptions() {
	dialogBoxTitle.innerHTML = "Track Options";
	dialogBoxText.innerHTML  = "Here's where you would edit track options.";
	
	dialogBox.style.display = "block";
	
	return false;
}

function togglepreview(previewClass) {
	var preview = document.getElementsByClassName(previewClass);
	
	if (preview[0].style.display == "inline-block") {
		preview[0].style.display = "none";
	} else {
		preview[0].style.display = "inline-block";
	}
}

function playpause() {
	var playpause = document.getElementsByClassName("playpause");
	
	if (playpause[0].className == "playpause play") {
		playpause[0].className = "playpause pause";
	} else {
		playpause[0].className = "playpause play";
	}
}

(function() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Use event.pageX / event.pageY here
    }
})();

/*
document.body.addEventListener("contextmenu", function(evt){evt.preventDefault();return false;});*/