const functions = require('../../../functions.js'), // Functions
    fs = require('fs'); // File system

exports.run = function (message, client) { // Command
    fs.readFile('./data.json', 'utf8', function readFileCallback (err, data) { // Read file
        if(err) console.log('error', err); // Log error

        let obj = JSON.parse(data); // Convert to list

        const member = client.users.get(message.content[2]); // Get first mention

        for (let a = 0; a < obj.users.length; a++) { // Check if id matches author
            if (obj.users[a].id == member.id) {
                if (obj.users[a].money) {
                    obj.users[a].name = member.name; // Update name
                    functions.write(message, 'sucess', member.username + ' has $' + obj.users[a].money + '.', obj); // Send output

                    a = obj.users.length;
                } else {
                    obj.users[a].name = member.name; // Update name
                    obj.users[a].money = 0;
                    functions.write(message, 'sucess', member.username + ' has $' + obj.users[a].money + '.', obj); // Send output

                    a = obj.users.length;
                }
            } else if (a + 1 == obj.users.length) {
                obj.users.push({name: member.username, id: member.id, money: 0}); //Create random thiccness starting value
                functions.write(message, 'sucess', member.username + ' has $' + obj.users[a + 1].money + '.', obj); // Send output
                
                a = obj.users.length;
            }
        }
    });
}

exports.about = 'Check money'; // About

exports.parameter = ['mention']; // Parameter

exports.emoji = '🗓';