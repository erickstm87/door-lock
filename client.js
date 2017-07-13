var io = require('socket.io-client'),
    localConfigs = require('./config'),
    socket = io(localConfigs.heroUrl),
    bcrypt = require('bcryptjs');

//setup my servo
var unlockedState = 1000,
    lockedState = 2200;

var motorPin = 14,
    buttonPin = 4,
    ledPin = 17;

var locked = true;

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
    if(res && locked === true){
      unlockDoor();
    }

    else{
      bcrypt.compare(msg, localConfigs.anotherSecret, (err, res) => { //anotherSecret is lock
        if(res && locked === false){
	         lockDoor();
        }
        else{
	         console.log('who are you?');
        }
      });
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
