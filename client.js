// Connect to server
console.log('1');
var io = require('socket.io-client');
const express = require('express');
var app = express();

app.set('port', (process.env.PORT || 4390));
var socket = io.connect(`https://guarded-ravine-69960.herokuapp.com:${port}`, {reconnect: true});

console.log('2');

// Add a connect listener
socket.on('connect', function(socket) {
  console.log('Connected!');
});

console.log('3');




//https://guarded-ravine-69960.herokuapp.com/
