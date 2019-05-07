const fs = require('fs'), // File system
    functions = require('./functions'); // Functions

exports.run = function (message, client) { // Command
    let found = false;

    fs.readdir('./Commands', function(err, items) { // Read commands directory
        for (let a = 0; a < items.length; a++) { // Loop through categories
            fs.readdir('./Commands/'+items[a], function(err, items2) { // Read categories
                for (let b = 0; b < items2.length; b++) { // Loop through commands
                    if (message.content[1] == items2[b]) { // Check if command matches message
                        if (items[a] == 'Admin') { // Check if command is for admin
                            if(message.member.roles.some(r=>data.adminRoles.includes(r.name)) ) { // Check if user has an admin role
                                check([items[a], items2[b]], 2);
                            } else {
                                functions.write(message, 'error', 'You need the permission(s) `' + command.permissions().join(', ') + '` to use the command `' + message.content[1] + '.'); // Send denial message
                            }
                        } else {
                            check([items[a], items2[b]], 2);
                        }

                        found = true;
                    } else if (a+1 == items.length && b+1 == items2.length && !found) {
                        functions.write(message, 'error', 'Command not found, please use `Gala help` for commands.'); // Send error message
                    }
                }
            });
        }
    });

    function check(items, num) {
        let command = './Commands';

        for (let a = 0; a < items.length; a++) {
            command += '/'+items[a];
        }

        const file = require(command+'/main.js'); // Get file

        if (!file.parameter) {
            file.run(message, client); // Run command
        } else {
            for (let b = 0; b < parameter.length; b++) {
                if (file.parameter[b] == 'command') {
                    if (message.content[num]) {
                        fs.readdir(command, function(err, subCommands) {
                            if(err) console.log('error', err); // Log error

                            for (let a = 0; a < subCommands.length; a++) {
                                if (subCommands[a] == message.content[num]) {
                                    items.push(subCommands[a]);
                                    check(items, num+1);
                                    a = subCommands.length;
                                } else if (a+1 == subCommands.length) {
                                    functions.write(message, 'error', 'Subcommand not found, please use `Gala ' + command.replace('./Commands/' + items[0] + '/', '').replace('/', ' ') + '` for commands.'); // Send error message
                                }
                            }
                        });
                    }
                } else if (file.parameter[b] == 'hex') {
                    const re = /[0-9A-Fa-f]{6}/g; // Test String
                    message.content[num] = message.content[num].replace('#', ''); // Take off #

                    if (re.test(message.content[num]) && message.content[num].length == 6) { // Check if valid hex
                        file.run(message, message.content[num]); // Run command
                    } else {
                        functions.write(message, 'error', 'Invalid hex code.'); // Write error
                    }
                } else if (file.parameter[b] == 'mention') {
                    const member = message.content[num].mentions.members.first(); // Get first mention

                    if (member !== undefined) { // Check if mention exists
                        file.run(message, message.content[num]); // Run command
                    } else {
                        functions.write(message, 'error', 'Person not found.'); // Write error
                    }
                }
            }
        }
    }
};
