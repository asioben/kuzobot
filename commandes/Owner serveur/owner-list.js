module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    if(message.member.hasPermission("ADMINISTRATOR")) {


        let list = message.guild.members.cache.filter(u => db.get("owner_" + message.guild.id + "_" + u.id) === true).map(a => a.user.tag);
        if(list.length < 1) return message.channel.send(`**${emojis.non} Il n'y a aucun membre owner sur ce serveur.**`)

        let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emojis.settings} Liste des owners :`)
        .setDescription(list)
        .setColor("303136")
        .setFooter(client.user.username)

        return message.channel.send(embed)

    } else {

        return message.channel.send(`**${emojis.non} Vous n'avez pas la permission nécessaire pour utiliser cette commande.**`)

    }

};

module.exports.help = {
    name: "owner-list",
    aliases: ["o-list"],
    category: "ownerss",
    enabled: true,
    description: "Affiche la liste des personnes owner."
};