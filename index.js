// First we need to import the HTTP module. This module contains all the logic for dealing with HTTP requests.
var express = require('express'),
    request = require('request');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//Here is where I initialize my express server and my socket
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

//This is where the non public info goes
var accessToken = process.env.myToken;
var verifiedUser = { id: process.env.myId };
var token = jwt.sign(verifiedUser, process.env.aSecretPin);
var anotherToken = jwt.sign(verifiedUser, process.env.anotherSecret);

//configure my application
app.set('port', (process.env.PORT || 4390));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.send('ngrok is working. path hit: ' + req.url);
});

io.on('connection', function(socket){
  socket.emit('anEvent', 'emitted an event now from the server!!!!****');
});

server.listen(app.get('port'));

app.get('/oauth', function(req, res) {
  if(!req.query.code){
    res.status(500);
    res.send({'Error': 'It\'s not getting the code'});
    console.log('looks like not getting the code');
  }
  else {
    request({
      url: 'https://slack.com/api/oauth.access',
      qs: {code: req.query.code, oauth_access_token: accessToken},
      method: 'GET',
    }, function(error, response, body){
      if(error){
        console.log(error);
      }
      else{
        res.json(body);
      }
    })
  }
});

app.post('/command', function(req, res){

   try {
     jwt.verify(token, req.body.text);
     io.emit('newMessage', req.body.text);
     res.send('Door is unlocked hail satan');
   }
   catch(e){
     try{
       jwt.verify(anotherToken, req.body.text);
       io.emit('newMessage', req.body.text);
       res.send('Door is locked');
     }
     catch(e){
       io.emit('warning', 'someone is passing the wrong pin');
       res.send('don\'t understand')
     }
  }
});
