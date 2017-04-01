// Connect to server
console.log('1');
var socket = require('socket.io-client')('http://guarded-ravine-69960.herokuapp.com/command', {reconnect: true});
//var socket = io();

console.log('2');

// Add a connect listener
socket.on('anEvent', function(msg){
  console.log('here is your message', msg);
});

console.log('3');
