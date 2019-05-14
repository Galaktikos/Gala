const gala = require('../../../Gala.js'), // Gala core
    fs = require('fs'); // File system

exports.run = function (message, client) { // Command
    fs.readFile('./data.json', 'utf8', function readFileCallback (err, data) { // Read file
        if(err) console.log('error', err); // Log error

        let obj = JSON.parse(data); // Convert to list

        const member = client.users.get(message.content[2]); // Get first mention

        if (message.content[3] > 100) {
            gala.functions.write(message, 'error', 'You cannot ping a person more than 100 times.');
        } else {
            for (let a = 0; a < message.content[3]; a++) {
                message.channel.send(member).then(msg => msg.delete());
            }
        }

        json = JSON.stringify(obj); // Convert to json
        fs.writeFile('./data.json', json, 'utf8', function(err, result) { // Write to json
            if(err) console.log('error', err); // Log error
        });
    });
}

exports.about = 'Ping someone rapidly.'; // About

exports.parameter = [{'type': 'mention', 'text': 'Reply by mentioning yourself or another user to spam.'}, {'type': 'number', 'text': 'Reply by typing the number of times you would like to ping the person. (Max: 100)'}]; // Parameter

exports.emoji = '⁉';
