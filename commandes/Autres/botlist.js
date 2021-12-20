module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const Discord = require('discord.js');
    const fs = require('fs')

        let bots = message.guild.members.cache.filter(m => m.user.bot).size;
        let noms = message.guild.members.cache.filter(m => m.user.bot).map(m => `\`\`\`json\n${m.user.id}: ${m.user.tag}\`\`\``).join("");
        
        var embed = new Discord.MessageEmbed()
        .setTitle(`${emojis.fleched} Liste des bots sur ${message.guild} (${bots})`)
        .setDescription(noms)
        .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
        message.channel.send(embed)
        .setColor ("303136")
    };


module.exports.help = {
    name: "botlist",
    aliases: ["listbot"]
};