const gala = require('../../../../Gala.js'), // Functions
    fs = require('fs'); // File system

exports.run = function (message, client) { // Command
    fs.readFile('./data.json', 'utf8', function readFileCallback (err, data) { // Read file
        if(err) console.log('error', err); // Log error

        let obj = JSON.parse(data); // Convert to list

        const member = client.users.get(message.content[3]); // Get first mention

        for (let a = 0; a < obj.users.length; a++) { // Check if id matches author
            if (obj.users[a].id == member.id) {
                if (obj.users[a].value) {
                    obj.users[a].name = member.name; // Update name
                    gala.functions.write(message, 'sucess', member.username + ' is ' + obj.users[a].value + '% thicc!', obj); // Send output
                    
                    a = obj.users.length;
                } else {
                    obj.users[a].name = member.name; // Update name
                    obj.users[a].money = 0;
                    gala.functions.write(message, 'sucess', member.username + ' is ' + obj.users[a+1].value + '% thicc!', obj); // Send output

                    a = obj.users.length;
                }
            } else if (a + 1 == obj.users.length) {
                obj.users.push({name: member.username, id: member.id, value: Math.round(Math.random()*200)}); //Create random thiccness starting value
                gala.functions.write(message, 'sucess', member.username + ' is ' + obj.users[a + 1].value + '% thicc!', obj); // Send output
                a = obj.users.length;
            }
        }

        json = JSON.stringify(obj); // Convert to json
        fs.writeFile('./data.json', json, 'utf8', function(err, result) { // Write to json
            if(err) console.log('error', err); // Log error
        });
    });
}

exports.about = "View you or other people's thiccness."; // About

exports.parameter = [{'type': 'mention', 'text': 'Reply by mentioning yourself or another user to view thiccness.'}]; // Parameter

exports.emoji = '🔎';
