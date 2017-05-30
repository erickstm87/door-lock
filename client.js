var io = require('socket.io-client'),
    localConfigs = require('./config'),
    socket = io(localConfigs.heroUrl),
    bcrypt = require('bcryptjs');

//setup my servo
var unlockedState = 1000;
var lockedState = 2200;

var motorPin = 14;
var buttonPin = 4
var ledPin = 17

var locked = true

//setting up gpio down below    
var Gpio = require('pigpio').Gpio,
    motor = new Gpio(motorPin, {mode: Gpio.OUTPUT}),
    dutyCycle = 0;

lockDoor();
//button setup here

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
      if(locked === true)
      {
        unlockDoor();
	socket.emit('locked state', 'isNotLocked');
      }
      else
      {
        lockDoor();
  	socket.emit('locked state', 'isLocked');
      }
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

function lockDoor() {
	motor.servoWrite(lockedState);
	//led.digitalWrite(1);
	locked = true
  	
  	//After 1.5 seconds, the door lock servo turns off to avoid stall current
  	setTimeout(function(){motor.servoWrite(0)}, 1500)
}

function unlockDoor() {
	motor.servoWrite(unlockedState);
	//led.digitalWrite(0);
	locked = false

  	//After 1.5 seconds, the door lock servo turns off to avoid stall current
  	setTimeout(function(){motor.servoWrite(0)}, 1500)
}

