// First we need to import the HTTP module. This module contains all the logic for dealing with HTTP requests.
require('./config.json')
var express = require('express');
var request = require('request');
const jwt = require('jsonwebtoken');
var CircularJSON = require('circular-json');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// We define the port we want to listen to. Logically this has to be the same port than we specified on ngrok.
var accessToken = process.env.myToken;

const PORT = 4390;

var verifiedUser = { id: 10};
var token = jwt.sign(verifiedUser, process.env.secretPin);

app.listen(PORT, function() {
  console.log('example app listening on port ' + PORT);
});

app.get('/', function(req, res){
  res.send('ngrok is working. path hit: ' + req.url);
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
       jwt.verify(token, req.body.text)
       res.send('I will obey');
     }
     catch(e){
       res.send('don\'t understand');
     }
  });
