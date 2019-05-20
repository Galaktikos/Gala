const gala = require("../../../../Gala.js"), // Gala core
    fs = require("fs"); // File system

exports.run = function (message, color) {
    fs.readFile('./data.json', 'utf8', function readFileCallback (err, data) { // Read file
        let server = {
            'settings': {
                'name': '';
                
            },
            'categories': [
                'uncategorized': {
                    'channels': [ ]
                }
            ]
        }
    }
}

exports.about = 'Save a backup the server.'; // About

exports.emoji = '🌐';
