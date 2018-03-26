	//Used for keeping track of timer
	var minutesLabel = document.getElementById("minutes");
	var secondsLabel = document.getElementById("seconds");
	var millisecondsLabel = document.getElementById("milliseconds");
	var totalMilliseconds = 0;
	var playing=false;
	setInterval(setTime, 1);

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
	
	var tracktext = ["Video Track 1", "Audio Track 1", "Video Track 2", "Audio Track 2"];
	
	// Setup track canvases.
	for (i = 0; i < tracks.length; i++) {
		tracks[i].width = tlwidth;
		tracks[i].height = tlheight;
		
		var trk = tracks[i].getContext("2d");
		
		trk.font = "10px monospace";
		trk.fillText(tracktext[i], window.innerWidth * 0.01, window.innerHeight * 0.03);
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
	trk.strokeRect(mouseX - (window.innerWidth * 0.055), 0, 1, 500);
	trk.fill();
	
	console.log(mouseX+":"+mouseY);
}

function popup (title, dialog) {
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
		playing=true;
	} else {
		playpause[0].className = "playpause play";
		playing=false;
	}
}

function stopbutton(){
	totalMilliseconds=0;
	playing=false;
	var playpause = document.getElementsByClassName("playpause");
	playpause[0].className = "playpause play";
	millisecondsLabel.innerHTML = "000";
	secondsLabel.innerHTML="00";
	minutesLabel.innerHTML="00";
}

function setTime() {
	if (playing){
		++totalMilliseconds;
		millisecondsLabel.innerHTML = parseInt(totalMilliseconds)%100;
		secondsLabel.innerHTML=pad(parseInt((totalMilliseconds/100)%60));
		minutesLabel.innerHTML=pad(parseInt(totalMilliseconds/6000));
	}
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

document.addEventListener('keydown',function(e){

	if (e.altKey){
	if (e.keyCode == 90){
		document.querySelector("#undo").onclick()
	}
		if (e.keyCode == 89){
		document.querySelector("#redo").onclick()
	}
		if (e.keyCode == 88){
		document.querySelector("#cut").onclick()
	}
		if (e.keyCode == 67){
		document.querySelector("#copy").onclick()
	}
		if (e.keyCode == 80){
		document.querySelector("#paste").onclick()
	}
		if (e.keyCode == 68){
		document.querySelector("#clearselection").onclick()
	}
		if (e.keyCode == 65){
		document.querySelector("#selectall").onclick()
	}
		if (e.keyCode == 220){
		document.querySelector("#makeclipatpoint").onclick()
	}
	
	}
	
			if (e.keyCode == 32){
		playpause();
	}
			if (e.keyCode == 46){
		document.querySelector("#delete").onclick()
	}
},false);

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