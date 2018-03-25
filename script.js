//Main script file

window.onload = function() {
	// Get dialog box elements.
	var dialogBox = document.getElementById("dialogBox");
	var dialogBoxTitle = document.getElementById("dialogBoxTitle");
	var dialogBoxText = document.getElementById("dialogBoxText");
	
	// Create variable for mouse coordinates
	var mouseX = 0;
	var mouseY = 0;
	
	
	// Create tracks.
	var timeline = document.getElementById("timeline");
	var timelinecss = getComputedStyle(timeline);
	
	var tlwidth = parseInt(timelinecss.getPropertyValue('width'), 10) * 0.98;
	var tlheight = parseInt(timelinecss.getPropertyValue('height'), 10) * 0.20;
	
	var tracks = document.getElementsByClassName("track");
	var main = document.getElementById("main");
	
	// Setup track canvases.
	for (i = 0; i < tracks.length; i++) {
		tracks[i].width = tlwidth;
		tracks[i].height = tlheight;
		
		var trk = tracks[i].getContext("2d");
		
		trk.font = "10px monospace";
		trk.fillText("Video Track 1", 10, 12);
	}
}

function trackclick(track, type, ev) {
	ev.preventDefault();
	
	var track = document.getElementById(track);
	
	var trk = track.getContext("2d");
	
	if (type == "vid") {
		trk.strokeStyle = "#FF0000";
		trk.shadowColor = "#FF0000";
		trk.fillStyle = "#FF0000";
	} else {
		trk.strokeStyle = "#0066FF";
		trk.shadowColor = "#0066FF";
		trk.fillStyle = "#0066FF";
	}
	
	trk.shadowBlur = 5;
	trk.strokeRect(mouseX - 75, 0, 0, 100);
	trk.fill();
	
	console.log(mouseX+":"+mouseY);
}

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

function togglepreview(previewId) {
	var preview = document.getElementById(previewId);
	
	if (preview.style.display == "inline-block") {
		preview.style.display = "none";
	} else {
		preview.style.display = "inline-block";
	}
}

function dragpreview(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowdrop(ev) {
    ev.preventDefault();
}

function droppreview(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.className = "preview "+data;
	console.log("Dropped track "+data+" into preview!");
}

function playpause() {
	var playpause = document.getElementsByClassName("playpause");
	
	if (playpause[0].className == "playpause play") {
		playpause[0].className = "playpause pause";
	} else {
		playpause[0].className = "playpause play";
	}
}

// Thanks T.J. Crowder for the mouse cursor tracking code:
// https://stackoverflow.com/questions/7790725/javascript-track-mouse-position#7790764
(function() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var eventDoc, doc, body;

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
		
		mouseX = event.pageX;
		mouseY = event.pageY;
    }
})();

/*
document.body.addEventListener("contextmenu", function(evt){evt.preventDefault();return false;});*/