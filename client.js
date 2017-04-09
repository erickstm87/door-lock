var io = require('socket.io-client');
var socket = io('https://guarded-ravine-69960.herokuapp.com/');

socket.on('connect', function(){
  console.log('connected to heroku app');
})

socket.on('anEvent', function(msg){
  console.log('here is your message', msg);
});

socket.on('aMessage', function(msg){
  console.log('here is your message', msg);
});

socket.on('newMessage', function(msg){
  console.log('i\'m seeing your message from your pin!!!', msg);
})

socket.on('warning', function(msg){
  console.log('you have a warning:', msg);
});
