exports.run = function (message) {
    var d = new Date(message.timestamp);
    
    console.log(d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + ' ' + message.author.username + ': ' message.content);
}
