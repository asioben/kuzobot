module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    if(message.member.hasPermission("ADMINISTRATOR")) {

        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if(!channel) return message.channel.send(`**${emojis.non} Veuillez indiquez un salon.**`)
        if(channel.type !== "text") return message.channel.send(`**${emojis.non} Veuillez indiquez un salon textuel.**`)
        if(db.get("logs_channel_" + message.guild.id) === channel.id) return message.channel.send(`**${emojis.non} Le système de logs est déja activé dans ce salon.**`)
        
        let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emojis.oui} Succès :`)
        .setDescription(`**${emojis.fleched} Le système de logs a bien été activé dans le salon : \`${channel.name}\`.**`)
        .setColor("303136")
        .setFooter(client.user.username)

        db.set("logs_channel_" + message.guild.id, channel.id)
        return message.channel.send(embed)

    } else {

        return message.channel.send(`**${emojis.non} Vous n'avez pas la permission nécessaire pour utiliser cette commande.**`)

    }
 
};

module.exports.help = {
    name: "logs-on",
    aliases: [],
    category: "logs",
    enabled: true,
    description: "Permet d'activer le système de logs."
};