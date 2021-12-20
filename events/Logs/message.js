module.exports = (client, message) => {
    
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;  
    
    const Discord = require("discord.js");
    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");

    if(!db.get("logs_mentions_" + message.guild.id)) return;
    
    let channel = db.get("logs_channel_" + message.guild.id)

    if(client.channels.cache.get(channel)) { 

        if(message.mentions.users.first() || message.mentions.everyone) {

            let mention;

            if(message.mentions.everyone && message.content.includes("@here")) {
                mention = "@here"
            } else if(message.mentions.everyone && message.content.includes("@everyone")) {
                mention = "@everyone"
            } else {
                mention = message.mentions.users.first().tag
            }

            let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(`${emojis.fleched} Nouvelle mention :`)
            .setDescription(`${message.author.tag} a mentionné ${mention} dans <#${message.channel.id}>.`)
            .setColor("303136")
            .setTimestamp()

            return client.channels.cache.get(channel).send(embed)
        } else {
            return;
        }

    }

};