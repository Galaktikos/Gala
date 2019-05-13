const fs = require('fs'), // File system
    settings = require('./settings.json'), // Settings
    functions = require('./functions'); // Functions

exports.run = function (message, client) { // Command
    if (message.content[1]) {
        fs.readdir('./Commands', function(err, items) { // Read commands directory
            items = items.filter(function(ele){return ele != 'main.js'});

            function commands() {
                for (let a = 0; a < items.length; a++) { // Loop through categories
                    fs.readdir('./Commands/'+items[a], function(err, items2) { // Read categories
                        for (let b = 0; b < items2.length; b++) { // Loop through commands
                            if (message.content[1] == items2[b].toLowerCase()) { // Check if command matches message
                                if (items[a] == 'Admin') { // Check if command is for admin
                                    if(message.member.roles.some(r=>data.adminRoles.includes(r.name)) ) { // Check if user has an admin role
                                        check([items[a], items2[b]], 2);
                                    } else {
                                        functions.write(message, 'error', 'You need the permission(s) `' + command.permissions().join(', ') + '` to use the command `' + message.content[1] + '.'); // Send denial message
                                    }
                                } else {
                                    check([items[a], items2[b]], 2);
                                }

                                a = items.length;
                                b = items2.length;
                            } else if (a + 1 == items.length && b + 1 == items2.length) {
                                functions.write(message, 'error', 'Command not found, please use `' + settings.prefix + '` for commands.'); // Send error message
                            }
                        }
                    });
                }
            }

            for (let a = 0; a < items.length; a++) { // Loop through categories
                if (message.content[1] == items[a].toLowerCase()) { // Check if command matches message
                    if (message.content[2]) {
                        commands();
                    } else {
                        check([items[a]], 2);
                    }

                    message.content = message.content.filter(function(ele){return ele != message.content[1]});
                    a = items.length;
                } else if (a + 1 == items.length) {
                    commands();
                }
            }
        });
    } else {
        check([], 1);
    }

    function check(items, num) {
        let command = './Commands';

        for (let a = 0; a < items.length; a++) {
            command += '/'+items[a];
        }

        const file = require(command+'/main.js'); // Get file

        if (!file.parameter) {
            file.run(message, client); // Run command
        } else {
            for (let b = 0; b < file.parameter.length; b++) {
                if (file.parameter[b].type == 'command') {
                    fs.readdir(command, function(err, subCommands) {
                        if(err) console.log('error', err); // Log error
                        
                        subCommands = subCommands.filter(function(ele){return ele != 'main.js'});

                        if (message.content[num + b] && message.content[num + b] != '') {                
                            for (let a = 0; a < subCommands.length; a++) {
                                if (subCommands[a] == message.content[num  + b]) {
                                    items.push(subCommands[a]);
                                    check(items, num + 1);
                                    a = subCommands.length;
                                } else if (a + 1 == subCommands.length) {
                                    functions.write(message, 'error', 'Subcommand not found, please use `' + settings.prefix + ' ' + command.replace('./Commands/' + items[0] + '/', '').replace('/', ' ') + '` for commands.'); // Send error message
                                    a = file.parameter.length;
                                }
                            }
                        } else {
                            let emojis = [];
                            let text = '';

                            if (items.length !== 0) {
                                emojis = [{'name': 'Back', 'emoji': '⬅'}];
                                text = '⬅ **Back**\n`Go to previous page.`\n\n';
                            }

                            for (let a = 0; a < subCommands.length; a++) {
                                const file = require(command + '/' + subCommands[a] + '/main.js');
                                emojis.push({'name': subCommands[a], 'emoji': file.emoji});
                                text += file.emoji + ' **' + subCommands[a] + '**\n`' + file.about + '`\n\n';
                            }
                            
                            emojis.push({'name': 'Exit', 'emoji': '❌'});
                            text += '❌ **Exit**\n`Cancel current command.`';

                            functions.reactWrite(message, 'sucess', text, emojis, items, client);
                        }
                    });
                } else if (file.parameter[b].type == 'hex') {
                    if (message.content[num + b] && message.content[num + b] != '') {
                        const re = /[0-9A-Fa-f]{6}/g; // Test String
                        message.content[num + b] = message.content[num + b].replace('#', ''); // Take off #

                        if (re.test(message.content[num + b]) && message.content[num + b].length == 6) { // Check if valid hex
                            file.run(message, client); // Run command
                        } else {
                            functions.write(message, 'error', 'Invalid hex code.'); // Write error
                            a = file.parameter.length;
                        }
                    } else {
                        functions.colorWrite(message, 'sucess', file.parameter[b].text, client);
                    }
                } else if (file.parameter[b].type == 'mention') {
                    if (message.content[num + b] && message.content[num + b] != '') {
                        if (message.content[num + b].startsWith('<@') && message.content[num + b].endsWith('>')) {
                            message.content[num + b] = message.content[num + b].slice(2, -1);
                    
                            if (message.content[num + b].startsWith('!')) {
                                message.content[num + b] = message.content[num + b].slice(1);
                            }
                        } else {
                            
                        }

                        const member = client.users.get(message.content[num + b]);

                        if (member !== undefined) { // Check if mention exists
                            if (b + 1 == file.parameter.length) {
                                file.run(message, client); // Run command
                            }
                        } else {
                            functions.write(message, 'error', 'Person not found.'); // Write error
                            b = file.parameter.length;
                        }
                    } else {
                        functions.waitWrite(message, 'sucess', file.parameter[b].text, client);
                    }
                } else if (file.parameter[b].type == 'number') {
                    if (message.content[num + b] && message.content[num + b] != '') {
                        
                    } else {
                        functions.waitWrite(message, 'sucess', file.parameter[b].text, client);
                    }
                }
            }
        }
    }
};
