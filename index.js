const Discord = require('discord.js'), // Discord import
    client = new Discord.Client(), // Discord client
    fs = require('fs');
    functions = require('./functions.js'), // Functions
    settings = require('./settings.json'), // Settings
    logger = require('./logger.js'), // Logger
    readline = require('readline'), // Readline
    activities = [`with ${client.users.size} people`, "Try \"" + settings.prefix + "\""]; // Activities
    commandCheck = require('./commandCheck'); // Command Check
let activity = 0; // Acttivity count

client.on('ready', () => { // On ready
    const general = client.channels.find(channel => channel.name === "general"); // Find general channel

    functions.botWrite(general, 'neutral', 'Bot ready!', client) // Startup message

    setInterval(function() { // Activity loop
        if (activity >= activities.length) { // Check if activity value is greater than amount of activities
            activity = 0; // Reset activity count
        }

        client.user.setActivity(activities[activity]); // Set activity
        activity++; // Add to activity count
    }, 5000);
});

client.on('message', (message) => { // On message
    logger.run(message);
    
    message.content = message.content.toLowerCase().split(' '); // Split messages into parts and make lowercase

    if (message.content[0] == settings.prefix) { // Check if bot was called
        commandCheck.run(message, client);
        message.delete(0);
    }

    fs.readFile('./logs.json', 'utf8', function readFileCallback (err, data) { // Read file
        if(err) console.log('error', err); // Log error

        let object = JSON.parse(data); // Convert to list
        
        object.message.push(message);

        json = JSON.stringify(object); // Convert to json
        fs.writeFile('./logs.json', json, 'utf8', function(err, result) { // Write to json
            if(err) console.log('error', err); // Log error
        });
    });
});

function message() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('', (answer) => {
        const general = client.channels.find(channel => channel.name === "general"); // Find general channel
        
        general.send(answer);
        rl.close();
        console.log(`Sent`);
        message();
    });
}

message();

// Login
//client.login(process.env.BOT_TOKEN);
client.login('NTYxOTk3NTM5NDAyODQyMTMy.XNHz8w.Rdi35q4-Z1FD7O-XM76K4MS4e7o');
