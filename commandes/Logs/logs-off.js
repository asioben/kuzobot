module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    if(message.member.hasPermission("ADMINISTRATOR")) {

        if(!db.get("logs_channel_" + message.guild.id)) return message.channel.send(`**${emojis.non} Le système de logs n'est pas encore activé.**`)

        let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emojis.oui} Succès :`)
        .setDescription(`**${emojis.fleched} Le système de logs a bien été désactivé.**`)
        .setColor("303136")
        .setFooter(client.user.username)

        db.delete("logs_channel_" + message.guild.id)
        db.delete("logs_images_" + message.guild.id)
        db.delete("logs_mentions_" + message.guild.id)
        return message.channel.send(embed)

    } else {

        return message.channel.send(`**${emojis.non} Vous n'avez pas la permission nécessaire pour utiliser cette commande.**`)

    }
 
};

module.exports.help = {
    name: "logs-off",
    aliases: [],
    category: "logs",
    enabled: true,
    description: "Permet de désactiver le système de logs."
};