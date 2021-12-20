module.exports.run = async (client, message, args) => {

    const Discord = require("discord.js");
    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**${emojis.non} Vous n'avez pas la permission nécessaire pour utiliser cette commande.**`)

    let channel = db.get("logs_channel_" + message.guild.id)

    if(!channel) return message.channel.send(`**${emojis.non} Le système de logs est désactivé sur ce serveur.**`)

    if(args[0] === "on") {

        let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emojis.oui} Succès :`)
        .setDescription(`**${emojis.fleched} Le système de logs d'images a bien été activé dans le salon : \`${client.channels.cache.get(channel).name}\`.**`)
        .setColor("303136")
        .setFooter(client.user.username)

        db.set("logs_images_" + message.guild.id, "on")
        return message.channel.send(embed)

    } else if(args[0] === "off") {

        let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emojis.oui} Succès :`)
        .setDescription(`**${emojis.fleched} Le système de logs d'images a bien été désactivé.**`)
        .setColor("303136")
        .setFooter(client.user.username)

        db.delete("logs_images_" + message.guild.id)
        return message.channel.send(embed)

    } else {

        return message.channel.send(`**${emojis.non} Veuillez indiquez si vous souhaitez activer (\`on\`) ou désactiver (\`off\`) le système de logs d'images.**`)

    }
    
 
};

module.exports.help = {
    name: "logs-images",
    aliases: [],
    category: "logs",
    enabled: true,
    description: "Permet d'activer ou de désactiver le système de logs d'images."
};