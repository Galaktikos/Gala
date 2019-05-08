exports.run = function (message) {
    var d = new Date(1382086394000);
    
    console.log(d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + ' ' + message.author.username + ': ' message.content);
}
