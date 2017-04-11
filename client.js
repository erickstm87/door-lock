var io = require('socket.io-client');
var localConfigs = require('./config')
var socket = io(localConfigs.heroUrl);

socket.on('connect', function(){
  console.log('connected to heroku app');
})

socket.on('anEvent', function(msg){
  console.log('here is your message', msg);
});

socket.on('newMessage', function(msg){
  if(msg === localConfigs.secretPin){
    console.log('you have opened the door');
  }
  else{
    console.log('who are you?');
  }
});

socket.on('warning', function(msg){
  console.log('you have a warning:', msg);
});
