const functions = require("../../../../functions.js"), // Functions
    fs = require("fs"); // File system

exports.run = function (message, color) {
    fs.readFile('./data.json', 'utf8', function readFileCallback (err, data) { // Read file
        if(err) console.log('error', err); // Log error

        let obj = JSON.parse(data); // Convert to list

        for (let a = 0; a < obj.users.length; a++) { // Loop through values
            if (obj.users[a].id == message.author.id && obj.users[a].color) { // Check if id matches author
                obj.users[a].name = message.author.username; // Update name
                delete obj.users[a].color;
                functions.write(message, 'sucess', 'Your color has been reset.', obj);

                a = obj.users.length; // Stop loop
            } else if (a+1 == obj.users.length) {
                functions.write(message, 'error', 'You already have the default colors!', obj);
            }
        }

        json = JSON.stringify(obj); // Convert to json
        fs.writeFile('./data.json', json, 'utf8', function(err, result) { // Write to json
            if(err) console.log('error', err); // Log error
        });
    });
}

exports.about = 'Reset theme color.'; // About

exports.emoji = '↩';
