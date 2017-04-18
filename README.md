# door-lock
Heroku&amp;Slack App to lock/unlock my front door

This is a slack, socketio, and heroku application that will lock/unlock my door depending on what pin is passed. 
For those interested here is a general flow chart

send slack a '/' command and a pin -> this '/' command is configured to hit my heroku url -> the heroku url will check the incoming
message and depending on what is sent, will emit a socketio event to my client socket connection(my raspberry pi) along
with the message that was sent in -> client socket(rPi) will listen for certain events and if the 'lock' event is emitted it 
will check the message sent along with it(the pin) -> once the message has been verified with bwt it will invoke the servo

I still have to wire up the servo and write a cleaner readme but it's almost there!
