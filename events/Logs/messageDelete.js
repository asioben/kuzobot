module.exports = (client, message) => {
    
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    const Discord = require("discord.js");
    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");

    let channel = db.get("logs_channel_" + message.guild.id)

    if(client.channels.cache.get(channel)) { 
        
        if(message.attachments.first()) {
            
            if(db.get("logs_images_" + message.guild.id) !== "on") return;

            let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(`${emojis.fleched} Image supprimée :`)
            .setImage(message.attachments.first().proxyURL)
            .setColor("303136")
            .setTimestamp()

            return client.channels.cache.get(channel).send(embed)

        }

        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emojis.fleched} Message supprimé dans #${message.channel.name} :`)
        .setDescription(message.content)
        .setColor("303136")
        .setTimestamp()

        return client.channels.cache.get(channel).send(embed)

    }

};