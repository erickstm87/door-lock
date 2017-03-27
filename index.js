// First we need to import the HTTP module. This module contains all the logic for dealing with HTTP requests.

var express = require('express');
var request = require('request');
const jwt = require('jsonwebtoken');
var CircularJSON = require('circular-json');
const bodyParser = require('body-parser');
var app = express();
const http = require('http').Server(app);
const io = socketIO();

app.set('port', (process.env.PORT || 4390));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// We define the port we want to listen to. Logically this has to be the same port than we specified on ngrok.
var accessToken = process.env.myToken;
var verifiedUser = { id: process.env.myId };
var token = jwt.sign(verifiedUser, process.env.aSecretPin);

app.listen(app.get('port'), function() {
  console.log('example app listening on port', app.get('port'));
});

app.get('/', function(req, res){
  res.send('ngrok is working. path hit: ' + req.url);
});

io.on('connection', function(socket){
  io.emit('aMessage', 'here is the message');
});

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
     io.emit('newMessage', 'a message'); // main namespace
     jwt.verify(token, req.body.text);
     res.send('I will obey');
   }
   catch(e){
     io.emit('newMessage', 'a message'); // main namespace
     res.send('don\'t understand')
   }
});
