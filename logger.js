exports.run = function (message) {
    var d = new Date(message.createdAt);
    
    console.log(d.getUTCDate()+'/'+(d.getUTCMonth()+1)+'/'+d.getUTCFullYear()+' | '+d.getUTCHours()+':'+d.getUTCMinutes()+':'+d.getUTCSeconds()+'.'+d.getUTCMilliseconds()+' | '+message.author.username+': '+message.content);
}
