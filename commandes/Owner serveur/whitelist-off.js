module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    if(message.author === message.guild.owner.user) {

        if(db.get("whitelist_" + message.guild.id) !== "on") return message.channel.send(`**${emojis.non} Le système de whitelist n'est pas activé.**`)

        let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emojis.oui} Succès :`)
        .setDescription(`**${emojis.fleched} Le système de whitelist a bien été désactivé.**`)
        .setColor("303136")
        .setFooter(client.user.username)

        db.delete("antiwebhook_" + message.guild.id)
        db.delete("antibot_" + message.guild.id)
        db.delete("antichannel_" + message.guild.id)
        db.set("whitelist_" + message.guild.id, "off")
        return message.channel.send(embed)

    } else {

        return message.channel.send(`**${emojis.non} Seul le propriétaire du serveur peut utiliser cette commande.**`)

    }

};

module.exports.help = {
    name: "whitelist-off",
    aliases: ["wl-off"],
    category: "ownerss",
    enabled: true,
    description: "Permet de désactiver le système de whitelist."
};