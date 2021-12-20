module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    if(message.author === message.guild.owner.user) {

        if(db.get("whitelist_" + message.guild.id) !== "on") return message.channel.send(`**${emojis.non} Le système de whitelist n'est pas activé.**`)

        let member = message.mentions.members.first();

        if(!member) return message.channel.send(`**${emojis.non} Veuillez mentionnez un utilisateur.**`)
        if(db.get("whitelist_" + message.guild.id + "_" + member.id) === true) return message.channel.send(`**${emojis.non} Cette personne est déja whitelist.**`)

        let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emojis.oui} Succès :`)
        .setDescription(`**${emojis.fleched} ${member.user.tag} a bien été whitelist.**`)
        .setColor("303136")
        .setFooter(client.user.username)

        db.set("whitelist_" + message.guild.id + "_" + member.id, true)
        return message.channel.send(embed)

    } else {

        return message.channel.send(`**${emojis.non} Seul le propriétaire du serveur peut utiliser cette commande.**`)
    }

};

module.exports.help = {
    name: "whitelist",
    aliases: ["wl"],
    category: "ownerss",
    enabled: true,
    description: "Permet de whitelist un membre."
};