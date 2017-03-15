const {SHA256} = require('crypto-js');

var message = 'I am user number 3';
var hash = SHA256(message + 'somesecret').toString();

console.log(`message: ${message}`);
console.log(`Hash: ${hash}`);


