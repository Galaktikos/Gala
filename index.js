const Discord = require('discord.js'), // Discord import
client = new Discord.Client(), // Discord client
    functions = require('./functions.js'), // Functions
    settings = require('./settings.json'), // Settings
    logger = require('./logger.js'), // Logger
    readline = require('readline'), // Readline
    activities = [`with ${client.users.size} people`, "Try \"Gala, help\""]; // Activities
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
client.login(process.env.BOT_TOKEN);

