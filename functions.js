const Discord = require('discord.js'), // Discord client
    fs = require('fs'), // File system
    commandCheck = require('./commandCheck.js'); // Command Check

const colors = { // Colors
    'sucess': 65280,
    'neutral': 2061822,
    'error': 16711680,
    'custom': 0
}

exports.write = function (message, color, text, obj) { // Create and send an embed
    if (!obj) {
        fs.readFile('./data.json', 'utf8', function readFileCallback (err, data) { // Read file
            obj = JSON.parse(data); // Convert to list
            run();
        });
    } else {
        run();
    }

    function run() {
        if (color != 'error') { // Overide if error
            for (let a = 0; a < obj.users.length; a++) { // Loop through values
                if (obj.users[a].id == message.author.id) { // Check if id matches author
                    if (obj.users[a].color != null) { // Check for color preferance
                        colors.custom = obj.users[a].color; // Set custom color to user preference
                        color = 'custom'; // Set color to custom
                    }
                }
            }
        }

        send();
    }

    function send () { // Generate message
        const embed = new Discord.RichEmbed() // Create embed
            .setColor(colors[color])
            .setTitle(text)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp();

        message.channel.send(embed); // Send embed
    }
}

exports.botWrite = function (channel, color, text, client) {
    const embed = new Discord.RichEmbed() // Create embed
        .setColor(colors[color])
        .setTitle(text)
        .setAuthor(client.user.username, client.user.avatarURL)
        .setTimestamp();

    channel.send(embed); // Send embed
}

exports.reactWrite = async (message, color, text, items, comItems, client, obj) => { // Create and send an embed
    if (!obj) {
        fs.readFile('./data.json', 'utf8', function readFileCallback (err, data) { // Read file
            obj = JSON.parse(data); // Convert to list
            run();
        });
    } else {
        run();
    }

    function run() {
        if (color != 'error') { // Overide if error
            for (let a = 0; a < obj.users.length; a++) { // Loop through values
                if (obj.users[a].id == message.author.id) { // Check if id matches author
                    if (obj.users[a].color != null) { // Check for color preferance
                        colors.custom = obj.users[a].color; // Set custom color to user preference
                        color = 'custom'; // Set color to custom
                    }
                }
            }
        }

        send();
    }

    async function send () { // Generate message
        let done = false;

        const embed = new Discord.RichEmbed() // Create embed
            .setColor(colors[color])
            .setTitle(text)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp();

        let emojis = [];

        for (let a = 0; a < items.length; a++) {
            emojis.push(items[a].emoji);
        }

        message.channel.send(embed).then(async mes => {
			for (let a = 0; a < emojis.length; a++) {
		    	await mes.react(items[a].emoji);
            }

            await mes.awaitReactions((reaction, user) => {
                for (let a = 0; a < items.length; a++) {
                    if (reaction.emoji.name === items[a].emoji && user.id == message.author.id && !done) {
                        if (items[a].name == 'Back') {
                            message.content.pop();
                        } else {
                            message.content.push(items[a].name.toLowerCase());
                        }
                        
                        commandCheck.run(message, client);
                        mes.delete();
                        done = true;
                    }
                }
            }, {time: 120000});
        });
    }
}

exports.waitWrite = async (message, color, text, client, obj) => { // Create and send an embed
    if (!obj) {
        fs.readFile('./data.json', 'utf8', function readFileCallback (err, data) { // Read file
            obj = JSON.parse(data); // Convert to list
            run();
        });
    } else {
        run();
    }

    function run() {
        if (color != 'error') { // Overide if error
            for (let a = 0; a < obj.users.length; a++) { // Loop through values
                if (obj.users[a].id == message.author.id) { // Check if id matches author
                    if (obj.users[a].color != null) { // Check for color preferance
                        colors.custom = obj.users[a].color; // Set custom color to user preference
                        color = 'custom'; // Set color to custom
                    }
                }
            }
        }

        send();
    }

    async function send () { // Generate message
        let done = false;

        const embed = new Discord.RichEmbed() // Create embed
            .setColor(colors[color])
            .setTitle(text)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp();

        message.channel.send(embed).then(async mes => {
            await message.channel.awaitMessages(msg => {
                if (msg.author.id == message.author.id && !done) {
                    message.content.push(msg.content[0]);
                    commandCheck.run(message, client);
                    mes.delete();
                    done = true;
                }
            }, {time: 120000});
        });
    }
}

exports.colorWrite = async (message, color, text, client, obj) => { // Create and send an embed
    items = [{'name': 'Back', 'emoji': '⬅'}, {'name': 'Black', 'emoji': '⬛', 'value': '000000'}, {'name': 'White', 'emoji': '⚪', 'value': 'FFFFFF'}, {'name': 'Orange', 'emoji': '🔶', 'value': 'FFA500'}, {'name': 'Red', 'emoji': '♦', 'value': 'FF0000'}, {'name': 'Orange', 'emoji': '🔹', 'value': '1589FF'}];

    if (!obj) {
        fs.readFile('./data.json', 'utf8', function readFileCallback (err, data) { // Read file
            obj = JSON.parse(data); // Convert to list
            run();
        });
    } else {
        run();
    }

    function run() {
        if (color != 'error') { // Overide if error
            for (let a = 0; a < obj.users.length; a++) { // Loop through values
                if (obj.users[a].id == message.author.id) { // Check if id matches author
                    if (obj.users[a].color != null) { // Check for color preferance
                        colors.custom = obj.users[a].color; // Set custom color to user preference
                        color = 'custom'; // Set color to custom
                    }
                }
            }
        }

        send();
    }

    async function send () { // Generate message
        let done = false;

        const embed = new Discord.RichEmbed() // Create embed
            .setColor(colors[color])
            .setTitle(text)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp();

        let emojis = [];

        for (let a = 0; a < items.length; a++) {
            emojis.push(items[a].emoji);
        }

        message.channel.send(embed).then(async mes => {
			for (let a = 0; a < emojis.length; a++) {
		    	await mes.react(items[a].emoji);
            }

            await mes.awaitReactions((reaction, user) => {
                for (let a = 0; a < items.length; a++) {
                    if (reaction.emoji.name === items[a].emoji && user.id == message.author.id && !done) {
                        if (items[a].name == 'Back') {
                            message.content.pop();
                        } else {
                            message.content.push(items[a].value.toLowerCase());
                        }
                        
                        commandCheck.run(message, client);
                        mes.delete();
                        done = true;
                    }
                }
            }, {time: 1200000});
        });

        await message.channel.awaitMessages(msg => {
            if (msg.author.id == message.author.id && !done) {
                message.content.push(msg.content[0]);
                commandCheck.run(message, client);
                done = true;
            }
        }, {time: 120000});
    }
}