module.exports.run = async (client, message, args) => {

    const Discord = require("discord.js");
    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    if(db.get("whitelist_" + message.guild.id + "_" + message.member.id) !== true) return message.channel.send(`**${emojis.non} Vous devez être whitelist pour utiliser cette commande.**`)

    let channel = db.get("logs_channel_" + message.guild.id)

    if(!channel) return message.channel.send(`**${emojis.non} Le système de logs est désactivé sur ce serveur.**`)

    if(args[0] === "on") {

        let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emojis.oui} Succès :`)
        .setDescription(`**${emojis.fleched} Le système de logs vocal a bien été activé dans le salon : \`${client.channels.cache.get(channel).name}\`.**`)
        .setColor("303136")
        .setFooter(client.user.username)

        db.set("logs_vocal_" + message.guild.id, "on")
        return message.channel.send(embed)

    } else if(args[0] === "off") {

        let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**${emojis.fleched} Le système de logs vocal a bien été désactivé.**`)
        .setColor("303136")
        .setFooter(client.user.username)

        db.delete("logs_vocal_" + message.guild.id)
        return message.channel.send(embed)

    } else {

        return message.channel.send(`**${emojis.non} Veuillez indiquez si vous souhaitez activer (\`on\`) ou désactiver (\`off\`) le système de logs vocals.**`)

    }
    
 
};

module.exports.help = {
    name: "logs-vocal",
    aliases: [],
    category: "logs",
    enabled: true,
    description: "Permet d'activer ou de désactiver le système de logs vocal."
};