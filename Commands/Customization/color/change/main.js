const functions = require('../../../../functions.js'), // Functions
    fs = require('fs'); // File system

exports.run = function (message) {
    fs.readFile('./data.json', 'utf8', function readFileCallback (err, data) { // Read file
        if(err) console.log('error', err); // Log error

        let obj = JSON.parse(data); // Convert to list
        
        for (let a = 0; a < obj.users.length; a++) { // Loop through values
            if (obj.users[a].id == message.author.id) { // Check if id matches author
                obj.users[a].name = message.author.username; // Update name
                obj.users[a].color = parseInt(message.content[3], 16); // Set color value
                functions.write(message, 'sucess', 'Your color is now set to ' + parseInt(message.content[3], 16), obj);
            } else if (a+1 == obj.users.length) { // Check for last loop
                obj.users.push({name: message.author.username, id: message.author.id, color: parseInt(message.content[3], 16)}); // Create new user
                functions.write(message, 'sucess', 'Your color is now set to ' + parseInt(message.content[3], 16), obj);
            }
        }

        json = JSON.stringify(obj); // Convert to json
        fs.writeFile('./data.json', json, 'utf8', function(err, result) { // Write to json
            if(err) console.log('error', err); // Log error
        });
    });
}

exports.about = 'Change theme color.'; // About

exports.parameter = ['hex']; // Paramaters
