const functions = require('../../../../functions.js'), // Functions

exports.run = function (message) { // Command
  functions.write(message, 'sucess', 'Pong!'); // Send output
}

exports.about = "Pong!"; // About

exports.parameter = []; // Parameter
