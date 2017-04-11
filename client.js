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
    console.log('you have opened the door:', msg);
  }
  else{
    console.log('who are you?');
  }
});

// socket.on('newMessage', function(msg){
//   console.log('i\'m seeing your message from your pin!!!', msg);
// })

socket.on('warning', function(msg){
  console.log('you have a warning:', msg);
});
