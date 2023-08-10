const drag = document.getElementById("dragtarget");
const drop = document.getElementById("droptarget");

var append = document.querySelectorAll('.append');

console.log(window.location);

var counter = 0;
//NEW
//Because each page has to completely re-load for each index_.html variables can't be initialized 
//on one global page since we are not using loops at all here

if (window.location.href == "https://elizabethszczesny.github.io/Expedition/"){
  var i = 0;
  var pagenumber = 2;
}

if (window.location.href == "https://elizabethszczesny.github.io/Expedition/index2.html"){
  var i = 1;
  var pagenumber = 3;
}

if (window.location.href == "https://elizabethszczesny.github.io/Expedition/index3.html"){
  var i = 2;
  var pagenumber = 4;
}

if (window.location.href == "https://elizabethszczesny.github.io/Expedition/index4.html"){
  var i = 3;
  var pagenumber = 5;
}

//Make the DIV element draggagle:

/* Events fired on the drag target */

drag.addEventListener("dragstart", function(event) {
  event.dataTransfer.setData("Text", event.target.id);
});

drag.addEventListener("drag", function(event) {
  //document.getElementById("demo").innerHTML = "The text is being dragged.";
  drop.style.visibility = "visible";
});


/* Events fired on the drop target */
drop.addEventListener("dragover", function(event) {
  event.preventDefault();
  //document.getElementById("demo").innerHTML = "The text is OVER the droptarget.";
  drop.style.visibility = "visible";
  //event.target.style.border = "4px dotted brown";
});


drop.addEventListener("drop", function(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("Text");
  drop.appendChild(document.getElementById(data));
  //document.getElementById("demo").innerHTML = "The text was dropped.";
  drop.style.visibility = "visible";

  //so it doesn't keep appending more than once
  if(counter == 0){
    var clone = drag.cloneNode(true);
    append[0].appendChild(clone);
    console.log(clone);
    counter += 1;
  } 

  setTimeout(turnPage, 4000);
});

function turnPage(){
  if (pagenumber == 5){
    pagenumber = null;
  }
  if(window.location.href == "https://elizabethszczesny.github.io/Expedition/index4.html"){
      window.location = "index.html";
  } else {
    window.location = "index" + pagenumber + ".html";
  }
}


//need an array of the words

const words = ["pine cones", "acorns", "fox", "deer"];

const speech = window.speechSynthesis;
if(speech.onvoiceschanged !== undefined)
{
	speech.onvoiceschanged = () => populateVoiceList();
}

function populateVoiceList()
{
	const voices = speech.getVoices(); // now should have an array of all voices
  console.log(voices);
}

drop.addEventListener("drop", function() {

function getVoices() {
  let voices = speechSynthesis.getVoices();
  if(!voices.length){
    // some time the voice will not be initialized so we can call speak with an empty string
    // this will initialize the voices 
    let utterance = new SpeechSynthesisUtterance("");
    speechSynthesis.speak(utterance);
    voices = speechSynthesis.getVoices();
    console.log(voices.length)
  }
  return voices;
}

function speak(text, voice, rate, pitch, volume) {
  // create a SpeechSynthesisUtterance to configure the how text to be spoken 
  let speakData = new SpeechSynthesisUtterance();
  speakData.volume = volume; // From 0 to 1
  speakData.rate = rate; // From 0.1 to 10
  speakData.pitch = pitch; // From 0 to 2
  speakData.text = text;
  speakData.lang = 'en';
  speakData.voice = voice;
  
  // pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking 
  speechSynthesis.speak(speakData);
}

if ('speechSynthesis' in window) {

  let voice = getVoices();
  let rate = 0.4, pitch = 2, volume = 1;
  let text = words[i];

  speak(text, voice[42], rate, pitch, volume);

  console.log(voice.length)
}else{
  console.log('Speech Synthesis Not Supported'); 
}

});

