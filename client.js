var io = require('socket.io-client'),
    localConfigs = require('./config'),
    socket = io(localConfigs.heroUrl),
<<<<<<< HEAD
    bcrypt = require('bcryptjs'),
    Gpio = require('pigpio').Gpio,
      motor = new Gpio(motorPin, {mode: Gpio.OUTPUT}),
      button = new Gpio(buttonPin, {
        mode: Gpio.INPUT,
        pullUpDown: Gpio.PUD_DOWN,
        edge: Gpio.FALLING_EDGE
      }),
    led = new Gpio(ledPin, {mode: Gpio.OUTPUT});
//initialize my servo
var unlockedState = 1000,
    lockedState = 2200,
    motorPin = 14,
    buttonPin = 4,
    ledPin = 17,
    locked = true;
=======
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
>>>>>>> gpio

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
<<<<<<< HEAD
      led();
=======
      if(locked === true)
      {
        unlockDoor();
	//socket.emit('lockedState', 'isNotLocked');
      }
      else
      {
        lockDoor();
  	//socket.emit('lockedState', 'isLocked');
      }
>>>>>>> gpio
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

<<<<<<< HEAD

//declare the lock and unlock
function lockDoor() {
	motor.servoWrite(lockedState);
	led.digitalWrite(1);
=======
function lockDoor() {
	motor.servoWrite(lockedState);
	//led.digitalWrite(1);
>>>>>>> gpio
	locked = true
  	
  	//After 1.5 seconds, the door lock servo turns off to avoid stall current
  	setTimeout(function(){motor.servoWrite(0)}, 1500)
}

function unlockDoor() {
	motor.servoWrite(unlockedState);
<<<<<<< HEAD
	led.digitalWrite(0);
=======
	//led.digitalWrite(0);
>>>>>>> gpio
	locked = false

  	//After 1.5 seconds, the door lock servo turns off to avoid stall current
  	setTimeout(function(){motor.servoWrite(0)}, 1500)
}

