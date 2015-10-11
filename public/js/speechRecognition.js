$(document).ready(function() {

  var process = {un: 'tt', ui: 0, type: '', text: ''};
  var tmp = '';
  var isClicked= true;
  var prev_length = 0;
  var start_length = 0;
  var to_be_pushed = '';
  var final_transcript = '';
  var recognizing = false;
  var ignore_onend;
  var socket = io();
  var start_timestamp;
  var info = document.getElementById("info");

  if (!('webkitSpeechRecognition' in window)) {
    upgrade();
  }
  else {
    /*socket.on("process",function(process){
      var d = new Date();
      d = d.getHours() + ":" + d.getMinutes();
      createChatMessageDiv(process_client.un, process_client.ui, process.text, d);
    });*/
    start_button.style.display = 'inline-block';
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
      recognizing = true;
      showInfo('info_speak_now');
      start_button.innerHTML = "<img src='/public/assets/mic-animate.gif'>";
    };

    recognition.onerror = function(event) {
      if (event.error == 'no-speech') {
        start_button.innerHTML = "<img src='/public/assets/mic.gif'>";
        showInfo('info_no_speech');
        ignore_onend = true;
      }

      if (event.error == 'audio-capture') {
        start_button.innerHTML = "<img src='/public/assets/mic.gif'>";
        showInfo('info_no_microphone');
        ignore_onend = true;
      }

      if (event.error == 'not-allowed') {
        if (event.timeStamp - start_timestamp < 100) {
          showInfo('info_blocked');
        } else {
          showInfo('info_denied');
        }
        ignore_onend = true;
      }
    };

    recognition.onend = function() {
      recognizing = false;
      if (ignore_onend) {
        return;
      }
      if (!final_transcript) {
        showInfo('info_start');
        return;
      }
      var d = new Date();
      d = d.getHours() + ":" + d.getMinutes();
      //createChatMessageDiv(bareier.un, bareier.ui, final_transcript, d);
      process = {ui: bareier.ui, un: bareier.un, type: 'chat', text: final_transcript};
      socket.emit('process',process);
      showInfo('');
      start_button.innerHTML = "<img src='/public/assets/mic.gif'>";
    };

    recognition.onresult = function(event) {
      var interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      final_transcript = capitalize(final_transcript);
      //final_span.innerHTML = linebreak(final_transcript);
   }
}

function upgrade() {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
 return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
//  return s.replace('/\[\r\]/g', '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function startButton(event) {
if(isClicked){
  isClicked = false;
  final_transcript = '';
  recognition.lang = 'en-us';
  recognition.start();
  ignore_onend = false;
  //final_span.innerHTML = '';
  //interim_span.innerHTML = '';
  start_button.innerHTML = '<img src="/public/assets/mic-animate.gif">';
  showInfo('info_allow');
  showButtons('none');
  start_timestamp = event.timeStamp;
  }
  else{
    isClicked = true;
    start_button.innerHTML = "<img src='/public/assets/mic.gif'>";
  //final_span.innerHTML = "";
    recognition.stop();
    return;
  }
  }
function showInfo(s) {
  if(s){
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}

var current_style;
function showButtons(style) {
  if (style == current_style) {
    return;
  }
  current_style = style;
}




$('#start_button').on('mousedown', function(evt){
    
    startButton(evt);
  });
  $('#start_button').on('mouseup', function(evt){
    isClicked = false;
    startButton(evt);
});
});
