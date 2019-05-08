const functions = require('../../../functions.js'); // Functions

exports.run = function (message) { // Command
  functions.write(message, 'sucess', 'Ping!'); // Send output
}

exports.about = 'Ping!'; // About

exports.parameter = []; // Parameter
