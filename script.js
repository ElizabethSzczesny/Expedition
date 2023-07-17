const drag = document.getElementById("dragtarget");
const drop = document.getElementById("droptarget");

var append = document.querySelectorAll('.append');

console.log("Hello World");

var counter = 0;

//put all your id's into their own array manually and then loop through that

/*drag.addEventListener("mouseover", function(){
    if(counter == 0){
        var clone = drag.cloneNode(true);
        append[0].appendChild(clone);
        counter += 1
    }
    var node = document.createTextNode('move to match the word pine cone with the image of a pine cone');
    append[0].appendChild(node);
    }
)*/

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

var pagenumber = 1;

drop.addEventListener("drop", function(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("Text");
  drop.appendChild(document.getElementById(data));
  //document.getElementById("demo").innerHTML = "The text was dropped.";
  drop.style.visibility = "visible";

  if(counter == 0){
    var clone = drag.cloneNode(true);
    append[0].appendChild(clone);
    console.log(clone);
    counter += 1
  } 

  /*setTimeout(turnPage, 5000);
  pagenumber +=1
  if (pagenumber == 5){
    pagenumber = null;
  }*/
});

function turnPage(){
  window.location = "index" + pagenumber + ".html";
}

/*function getVoices() {
  let voices = speechSynthesis.getVoices();
  if(!voices.length){
    let utterance = new SpeechSynthesisUtterance("");
    speechSynthesis.speak(utterance);
    voices = speechSynthesis.getVoices();
  }
  return voices;
}*/

/*drop.addEventListener("drop", function() {

//Reading the book out loud
const message = new SpeechSynthesisUtterance(); 

// set the text to be spoken 
message.text = "Hello World!"; 

// create an instance of the speech synthesis object 
const speechSynthesis = window.speechSynthesis; 

const voices = getVoices();
message.voice = voices[42];
message.rate = 0.6;

// start speaking 
speechSynthesis.speak(message)
});*/

//const voices = window.speechSynthesis.getVoices();
//console.log(voices);

//voices.SpeechSynthesisVoice[42];

/*function getVoices() {
  let voices = window.speechSynthesis.getVoices();
  if(!voices.length){
    // some time the voice will not be initialized so we can call spaek with empty string
    // this will initialize the voices 
    let utterance = new SpeechSynthesisUtterance("");
    speechSynthesis.speak(utterance);
    voices = window.speechSynthesis.getVoices();
    console.log(voices);
  }
  console.log(voices);
  return voices;
}*/

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



/*drop.addEventListener("drop", function() {

function getVoices() {
  let voices = speechSynthesis.getVoices();
  if(!voices.length){
    // some time the voice will not be initialized so we can call speakk with an empty string
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
  let rate = 1, pitch = 0, volume = 1;
  let text = "Pine cone";

  speak(text, voice[2], rate, pitch, volume);

  /*setTimeout(()=>{ // speak after 2 seconds 
    rate = 0.5; pitch = 1.5, volume = 0.5;
    text = " Speaking with volume = 0.5 rate = 0.5 pitch = 1.5 ";
    speak(text, voices[10], rate, pitch, volume );
  }, 2000);
  console.log(voice.length)
}else{
  console.log(' Speech Synthesis Not Supported '); 
}

});*/

