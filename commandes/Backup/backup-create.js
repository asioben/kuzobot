module.exports.run = async (client, message, args, channel, guild) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const backup = require('discord-backup');

    let author = message.mentions.members.first();
    let member = message.mentions.members.first();

    if(db.get("whitelist_" + message.guild.id + "_" + message.member.id) !== true) return message.channel.send(`**${emojis.non} Vous devez être whitelist pour utiliser cette commande.**`)


    backup.create(message.guild).then((backupData) => {

        return message.channel.send('**La backup à été créer, voici son id:** `'+backupData.id+'`\n`'+prefix+'backup-load '+backupData.id+'` pour mettre la backup sur un serveur discord');

    }).catch(() => {

        return message.channel.send('**Une erreur est survenue**');

    });

    

};

module.exports.help = {
    name: "backup-create",
    aliases: ["createbackup", "backupcreate"],
    category: "backup",
    enabled: true,
    description: "Permet de unwhitelist un membre."
};