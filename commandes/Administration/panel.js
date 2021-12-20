module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    if(message.member.hasPermission("ADMINISTRATOR")) {
        
        let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emojis.oui} Succès :`)
        .setDescription(`**${emojis.fleched} Voici la configuration du bot sur ce serveur :**`)
        .addField(`Whitelist :`, db.get("whitelist_" + message.guild.id) === "on" ? `${emojis.enable} Activé` : `${emojis.disable} Désactivé`)
        .addField(`Anti webhook :`, db.get("antiwebhook_" + message.guild.id) === "on" ? `${emojis.enable} Activé` : `${emojis.disable} Désactivé`)
        .addField(`Anti channel :`, db.get("antichannel_" + message.guild.id) === "on" ? `${emojis.enable} Activé` : `${emojis.disable} Désactivé`)
        .addField(`Anti bot :`, db.get("antibot_" + message.guild.id) === "on" ? `${emojis.enable} Activé` : `${emojis.disable} Désactivé`)
        .addField(`Anti liens :`, db.get("antilink_" + message.guild.id) === "on" ? `${emojis.enable} Activé` : `${emojis.disable} Désactivé`)
        .addField(`Anti spam :`, db.get("antispam_" + message.guild.id) === "on" ? `${emojis.enable} Activé` : `${emojis.disable} Désactivé`)
        .addField(`Anti ban :`, db.get("antikick_" + message.guild.id) === "on" ? `${emojis.enable} Activé` : `${emojis.disable} Désactivé`)
        .addField(`Logs générales :`, db.get("logs_channel_" + message.guild.id) ? `${emojis.enable} Activé ➜ <#${client.channels.cache.get(db.get("logs_channel_" + message.guild.id)).id}>` : `${emojis.disable} Désactivé`)
        .addField(`Logs images :`, db.get("logs_images_" + message.guild.id) === "on" ? `${emojis.enable} Activé ➜ <#${client.channels.cache.get(db.get("logs_channel_" + message.guild.id)).id}>` : `${emojis.disable} Désactivé`)
        .addField(`Logs mentions :`, db.get("logs_mentions_" + message.guild.id) === "on" ? `${emojis.enable} Activé ➜ <#${client.channels.cache.get(db.get("logs_channel_" + message.guild.id)).id}>` : `${emojis.disable} Désactivé`)
        .setColor("303136")
        .setFooter(client.user.username)

        db.set("antilink_" + message.guild.id, "off")
        return message.channel.send(embed)

    } else {

        return message.channel.send(`**${emojis.non} Vous n'avez pas la permission nécessaire pour utiliser cette commande.**`)

    }

};

module.exports.help = {
    name: "panel",
    aliases: [],
    category: "admin",
    enabled: true,
    description: "Permet de montrer la configuration du serveur."
};