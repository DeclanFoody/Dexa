const express = require('express');
const app = express();
const apiai = require('apiai')('e195481dc12c41dd94d730fe3df1cd61');

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

const server = app.listen(5000);
app.get('/', (req, res) => {
  res.sendFile('index.html');
});
const io = require('socket.io')(server);
io.on('connection', function(socket) {
  socket.on('chat message', (text) => {

    // get a reply from AI API

    let apiaiReq = apiai.textRequest(text, {
      sessionId: '0d9fa56f76c844e5bfe2764fa1dd9f84'
    });

    apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
      socket.emit('bot reply', aiText); //send result back to client
    });

    apiaiReq.on('error',(error) => {
      console.log(error);
    });
    apiaiReq.end();
  
  });
});