module.exports = (client, oldMessage, newMessage) => {
    
    if(oldMessage.author.bot) return;
    if(oldMessage.channel.type === "dm") return;
    if(oldMessage.author.bot) return;
    if(oldMessage.content === newMessage.content) return;

    const Discord = require("discord.js");
    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");

    if(newMessage.content.length > 250) return;

    let channel = db.get("logs_channel_" + oldMessage.guild.id)

    if(client.channels.cache.get(channel)) { 
        
        let embed = new Discord.MessageEmbed()
        .setAuthor(oldMessage.author.username, oldMessage.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emojis.fleched} Message modifié dans #${oldMessage.channel.name} :`)
        .addField("Ancien message :", oldMessage.content)
        .addField("Nouveau message :", newMessage.content)
        .setColor("303136")
        .setTimestamp()

        return client.channels.cache.get(channel).send(embed)

    }

};