module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    fs = require("fs");
    
    const args1 = message.content.split(" ").slice(1).join(" ");
    var flip = require('flip-text');
    if(args1 === '' || args1 === ' ' || args1 === '  ' || args1 === '   '){
        const droit = new Discord.MessageEmbed()
        .setColor(`${db.color}`)
        .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
        .setTimestamp() 
        .setDescription(`${emojis.non} **Vous ne pouvez pas envoyer un message vide.**`);
        return message.channel.send(droit);
    }
    message.channel.send(flip(args1));
    message.delete();
};

module.exports.help = {
    name: "fliptext",
    aliases: ["fliptext"],
    category: "fun",
    enabled: true,
    description: "Convertie votre text en ascii."
};