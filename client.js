// Connect to server
console.log('1');
var io = require('socket.io-client');
// const express = require('express');
// var app = express();

//app.set('port', (process.env.PORT || 4390));
//var port = app.set('port', (process.env.PORT || 4390));
//var url = 'https://guarded-ravine-69960.herokuapp.com' + port;
var socket = io.connect('https://guarded-ravine-69960.herokuapp.com/', {reconnect: true});

console.log('2');

// Add a connect listener
socket.on('connection', function(socket) {
  console.log('Connected!');
});

socket.on('newMessage', function(msg){
  console.log('message: ' + msg);
});

console.log('3');
