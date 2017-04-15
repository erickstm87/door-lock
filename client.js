var io = require('socket.io-client'),
    localConfigs = require('./config'),
    socket = io(localConfigs.heroUrl),
    bcrypt = require('bcryptjs'),
    onoff = require('onoff');
var Gpio = onoff.Gpio,
  led = new Gpio(4, 'out'),
  interval;

var light = {
  interval = setInterval(function() {
  var value = (led.readSync() + 1) %2;
  led.write(value, function() {
    console.log('Changed LED state to: ', value);
  });
  }, 2000);

  process.on('SIGINT', function() {
    clearInterval(interval);
    led.writeSync(0);
    led.unexport();
    console.log('Bye, bye');
    process.exit();
};

socket.on('connect', function(){
  console.log('connected to heroku app');
})

socket.on('anEvent', function(msg){
  console.log('here is your message', msg);
});

//turns out it's actually pretty difficult to connect to another client. You need the socket id  
socket.on('newMessage', function(msg){
  bcrypt.compare(msg, localConfigs.secretPin, (err, res) => {
    if(res){
      console.log('you have opened the door'); //this is where i'll open the door
    }
    else{
      console.log('who are you?'); //this is where someone is trying to emit an event without knowing my pin
    }
  });

});

socket.on('warning', function(msg){
  console.log('you have a warning:', msg);
});


