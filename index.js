const Discord = require('discord.js'), // Discord import
    client = new Discord.Client(), // Discord client
    fs = require('fs'), // File system
    functions = require('./functions.js'), // Functions
    settings = require('./settings.json'), // Settings
    data = require('./data.json'), // Data
    activities = [`with ${client.users.size} people`, "Try \"Gala, help\""]; // Activities
    commandCheck = require('./commandCheck'); // Command Check
let activity = 0; // Acttivity count

client.on("ready", () => { // On ready
    const general = client.channels.find(channel => channel.name === "general"); // Find general channel

    functions.botWrite(general, 'neutral', "I'm ready!", client); // Startup message

    setInterval(function() { // Activity loop
        if (activity >= activities.length) { // Check if activity value is greater than amount of activities
            activity = 0; // Reset activity count
        }

        client.user.setActivity(activities[activity]); // Set activity
        activity++; // Add to activity count
    }, 5000);
});

client.on('message', (message) => { // On message
    message.content = message.content.toLowerCase().split(' '); // Split messages into parts and make lowercase

    if (message.content[0] == settings.prefix) { // Check if bot was called
        commandCheck.run(message, client);
    }
});

// Login
client.login(process.env.BOT_TOKENN);
