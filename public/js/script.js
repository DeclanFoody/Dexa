const SpeechRecogntion = window.SpeechRecogntion || window.webkitSpeechRecognition;
const recognition = new SpeechRecogntion();
const socket = io();


recognition.lang = 'en-US';
recognition.interimResults = false;

document.querySelector('button').addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('result', (e) => {
  let last = e.results.length -1;
  let text = e.results[last][0].transcript;

  console.log('Confidence' + e.results[0][0].confidence);
  
  
  
  socket.emit('chat message', text);
  document.querySelector('#output-you').innerHTML = text;


});

function synthVoice(text){
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}
socket.on('bot reply', function(replyText){
  synthVoice(replyText);
  console.log(replyText);
  
  document.querySelector('#output-bot').innerHTML = replyText;
});