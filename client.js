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
    button = new Gpio(buttonPin, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_DOWN,
      edge: Gpio.FALLING_EDGE
    }),
    led = new Gpio(ledPin, {mode: Gpio.OUTPUT});
    dutyCycle = 0;

var light = function(){
  setInterval(function () {
    led.pwmWrite(dutyCycle);
 
    dutyCycle += 5;
    if (dutyCycle > 255) {
      dutyCycle = 0;
    }
  }, 20);
};

//button setup here
button.on('interrupt', function () {
	//console.log("level: " + level + " locked: " + locked)
	//if (level == 0) {
	//	if (locked) {
	//		unlockDoor()
	//	} else {
	///		lockDoor()
	//	}
	//}
	console.log('pushed a button');
	light();
});

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
      light();
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


