// Connect to server
console.log('1');
var socket = io.connect('https://guarded-ravine-69960.herokuapp.com/', {reconnect: true});

console.log('2');

// Add a connect listener
socket.on('connection', function(socket) {
  console.log('Connected!');
});

socket.on('aMessage', function(msg){
  console.log('message: ' + msg);
});

console.log('3');
