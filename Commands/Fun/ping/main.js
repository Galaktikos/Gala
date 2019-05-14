const gala = require('../../../Gala.js'); // Functions

exports.run = function (message) { // Command
    gala.functions.write(message, 'sucess', 'Pong!'); // Send output
}

exports.about = 'Pong!'; // About

exports.emoji = '🏓';
