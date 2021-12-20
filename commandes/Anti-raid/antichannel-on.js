module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    if(message.member.hasPermission("ADMINISTRATOR")) {

        if(db.get("whitelist_" + message.guild.id) !== "on") return message.channel.send(`**${emojis.non} Le système de whitelist n'est pas activé.**`)
        if(db.get("antichannel_" + message.guild.id) === "on") return message.channel.send(`**${emojis.non} L'anti channel est déja activé.**`)

        let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emojis.oui} Succès :`)
        .setDescription(`**${emojis.fleched} L'anti channel a bien été activé, quand un membre non whitelist créera ou supprimera un salon, il sera automatiquement banni.**`)
        .setColor("303136")
        .setFooter(client.user.username)

        db.set("antichannel_" + message.guild.id, "on")
        return message.channel.send(embed)

    } else {

        return message.channel.send(`**${emojis.non} Vous n'avez pas la permission nécessaire pour utiliser cette commande.**`)

    }

};

module.exports.help = {
    name: "antichannel-on",
    aliases: [],
    category: "antiraid",
    enabled: true,
    description: "Permet d'activer le système d'anti création/suppression de salons."
};