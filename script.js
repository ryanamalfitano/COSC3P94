// Global declarations
// Used for keeping track of timer.
var totalMilliseconds = 0;
var playing=false;
setInterval(setTime, 10);

// Get dialog box elements.
var dialogBox = document.getElementById("dialogBox");
var dialogBoxTitle = document.getElementById("dialogBoxTitle");
var dialogBoxText = document.getElementById("dialogBoxText");

// Get track dialog boxes.
var trackBoxVid = document.getElementById("trackBoxVid");
var trackBoxAud = document.getElementById("trackBoxAud");

// Get media browser;
var mediaBrowser = document.getElementById("mediaBrowser");

// Vars for keeping track of open dialog boxes and menus.
var dialogOpen = false;
var trackOpen = false;
var menuOpen = false;
var mbrowserOpen = false;

// Create variable for mouse coordinates
var mouseX = 0;
var mouseY = 0;

// Get important elements.
var main = document.getElementById("main");

var timeline = document.getElementById("timeline");
    var timelinecss = getComputedStyle(timeline);
var tracks = document.getElementsByClassName("track");

// Get timeline and track dimensions.
var tlwidth = parseInt(timelinecss.getPropertyValue('width'), 10) * 0.98;
var tlheight = parseInt(timelinecss.getPropertyValue('height'), 10) * 0.20;

var trkwidth = tlwidth * 0.075;
var trkheight = tlheight - 0;

var tracktext = ["Video Track 1", "Audio Track 1", "Video Track 2", "Audio Track 2", "Add New Track"];
var trackimg = ["images/vidtrack1.jpg", "images/audtrack1.png", "images/vidtrack2.jpg", "images/audtrack2.png", "images/add.png"];
var image0 = new Image();
var image1 = new Image();
var image2 = new Image();
var image3 = new Image();
var image4 = new Image();

window.onload = function() {
    // Setup track canvases.
    for (i = 0; i < tracks.length; i++) {
        tracks[i].width = tlwidth;
        tracks[i].height = tlheight;
        
        var trk = tracks[i].getContext("2d");
        
        trk.font = "16px monospace";
        trk.fillText(tracktext[i], window.innerWidth * 0.01, window.innerHeight * 0.032);
        
        switch (i) {
            case 0:
                var track0 = tracks[i].getContext("2d");
                image0.src = trackimg[i];
                image0.onload = function(){
                    track0.drawImage(image0, 175, 0, trkwidth, trkheight);
                }
                break;
            case 1:
                var track1 = tracks[i].getContext("2d");
                image1.src = trackimg[i];
                image1.onload = function(){
                    track1.drawImage(image1, 175, 0, trkwidth, trkheight);
                }
                break;
            case 2:
                var track2 = tracks[i].getContext("2d");
                image2.src = trackimg[i];
                image2.onload = function(){
                    track2.drawImage(image2, 175, 0, trkwidth, trkheight);
                }
                break;
            case 3:
                var track3 = tracks[i].getContext("2d");
                image3.src = trackimg[i];
                image3.onload = function(){
                    track3.drawImage(image3, 175, 0, trkwidth, trkheight);
                }
                break;
            case 4:
                var track4 = tracks[i].getContext("2d");
                image4.src = trackimg[i];
                image4.onload = function(){
                    track4.drawImage(image4, 175, 0, trkwidth, trkheight);
                }
                break;
        }
    }
}

function trackclick(track, type, ev) {
    ev.preventDefault();
    
    var track = document.getElementById(track);
    var trk = track.getContext("2d");
    
    trk.strokeStyle = "#C8C8C8";
    trk.fillStyle = "#C8C8C8";
    
    trk.shadowColor = "#222222";
    trk.shadowBlur = 1;
    
    trk.fillRect(mouseX - (window.innerWidth * 0.055), 0, 5, 500);
    //console.log(mouseX+":"+mouseY);
}

function popup (title, dialog) {
    dialogBoxTitle.innerHTML = title;
    dialogBoxText.innerHTML  = dialog;
    
    window.setTimeout(function() {dialogBox.style.display = "block"; dialogOpen = true}, 10);
}

function popdown () {
    dialogBox.style.display = "none";
    dialogOpen = false;
}

function mediabrowserup() {
    window.setTimeout(function() {mediaBrowser.style.display = "block"; mbrowserOpen = true}, 10);
}

function mediabrowserdown() {
	mediaBrowser.style.display = "none";
    mbrowserOpen = false;
}

function trackoptionsvid() {
    if (mouseX >= window.innerWidth - 300) {
        trackBoxVid.style.left = mouseX-200+"px";
    } else {
        trackBoxVid.style.left = mouseX+"px";
    }
    trackBoxVid.style.top = mouseY-230+"px";
    //console.log(mouseX+":"+mouseY);
    
    window.setTimeout(function() {trackBoxVid.style.display = "block"; trackOpen = true}, 10);
}

function trackoptionsaud() {
    if (mouseX >= window.innerWidth - 300) {
        trackBoxAud.style.left = mouseX-200+"px";
    } else {
        trackBoxAud.style.left = mouseX+"px";
    }
    trackBoxAud.style.top = mouseY-130+"px";
    //console.log(mouseX+":"+mouseY);
    
    window.setTimeout(function() {trackBoxAud.style.display = "block"; trackOpen = true}, 10);
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
    //console.log("Dropped track "+data+" into preview!");
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
    document.getElementById("timer").innerHTML="00:00.00";
    document.getElementById("frames").innerHTML="Frame:0";
}

function setTime() {
    var time=document.getElementById("timer");
    var frame=document.getElementById("frames");
    
    if (playing){
        ++totalMilliseconds;
        var milliseconds = pad(parseInt(totalMilliseconds)%100);
        var seconds =pad(parseInt((totalMilliseconds/100)%60));
        var minutes=pad(parseInt(totalMilliseconds/6000));
        var framescount=parseInt((totalMilliseconds/100)*60);
        time.innerHTML=minutes+":"+seconds+"."+milliseconds;
        frame.innerHTML="Frame:"+framescount;
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
        if (e.keyCode == 77){
            document.querySelector("#openmediabrowser").onclick()
        }
    }
    
    if (e.keyCode == 32){
        playpause();
    }
    if (e.keyCode == 46){
        document.querySelector("#delete").onclick()
    }
}, false);

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

document.addEventListener("click", function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    
    if (target.tagName == "A") {
        console.log(target.tagName);
        target.focus();
    }
    
    if (dialogOpen) {
        if (target.id != "dialogBox" && target.id != "dialogBoxTitle" && target.id != "dialogBoxText") {
            popdown();
        }
    }
    
    if (trackOpen) {
        if (target.id != "trackBoxVid" && target.id != "trackBoxAud") {
            trackBoxVid.style.display = "none";
            trackBoxAud.style.display = "none";
            trackOpen = false;
        }
    }
    
    if (menuOpen) {
        if (target.tagName != "LI" && target.tagName != "UL" && target.tagName != "INPUT" && target.className != "openAnyways") {
            console.log(target.tagName);
            for (i = 0; i < document.getElementsByTagName("input").length; i++) {
                document.getElementsByTagName("input").item(i).checked = false;
            }
            menuOpen = false;
        }
    }
}, false);

document.body.addEventListener("contextmenu", function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    
    if (dialogOpen) {
        if (target.id != "dialogBox" && target.id != "dialogBoxTitle" && target.id != "dialogBoxText") {
            popdown();
        }
    }
    
    if (trackOpen) {
        if (target.id != "trackBoxVid" && target.id != "trackBoxAud") {
            trackBoxVid.style.display = "none";
            trackBoxAud.style.display = "none";
            trackOpen = false;
        }
    }
    
    e.preventDefault();
    return false;
}, false);