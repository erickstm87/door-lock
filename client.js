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
