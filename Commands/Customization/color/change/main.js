const gala = require('../../../../Gala.js'), // Gala core
    fs = require('fs'); // File system

exports.run = function (message) {
    fs.readFile('./data.json', 'utf8', function readFileCallback (err, data) { // Read file
        if(err) console.log('error', err); // Log error

        let obj = JSON.parse(data); // Convert to list
        
        for (let a = 0; a < obj.users.length; a++) { // Loop through values
            if (obj.users[a].id == message.author.id) { // Check if id matches author
                obj.users[a].name = message.author.username; // Update name
                obj.users[a].color = parseInt(message.content[3], 16); // Set color value
                gala.functions.write(message, 'sucess', 'Your color is now set to ' + parseInt(message.content[3], 16), obj);

                a = obj.users.length;
            } else if (a+1 == obj.users.length) { // Check for last loop
                obj.users.push({name: message.author.username, id: message.author.id, color: parseInt(message.content[3], 16)}); // Create new user
                gala.functions.write(message, 'sucess', 'Your color is now set to ' + parseInt(message.content[3], 16), obj);
                
                a = obj.users.length;
            }
        }

        json = JSON.stringify(obj); // Convert to json
        fs.writeFile('./data.json', json, 'utf8', function(err, result) { // Write to json
            if(err) console.log('error', err); // Log error
        });
    });
}

exports.about = 'Change theme color.'; // About

exports.parameter = [{'type': 'hex', 'text': 'Reply with color hex value or choose a color from the list below to change color.'}]; // Paramaters

exports.emoji = '📝';
