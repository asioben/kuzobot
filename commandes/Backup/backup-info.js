module.exports.run = async (client, message, args, channel, guild) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const backup = require('discord-backup');

    let author = message.mentions.members.first();
    let member = message.mentions.members.first();

    if(db.get("whitelist_" + message.guild.id + "_" + message.member.id) !== true) return message.channel.send(`**${emojis.non} Vous devez être whitelist pour utiliser cette commande.**`)


    const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send('**Veuillez spécifiez une id de backup**');

    backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new Discord.MessageEmbed()
            .setAuthor('Backup', backup.data.iconURL)
            .addField('Nom du Serveur:', backup.data.name)
            .addField('Taille:', backup.size + ' kb')
            .addField('Créer le:', formattedDate)
            .setFooter('Id de la Backup: '+backup.id);

        return message.channel.send(embed);

    }).catch((err) => {

        if (err === 'No backup found')
            return message.channel.send('**Je n\'ai pas trouer la backup**');
        else
        return message.channel.send('**Une erreur est survenue**');

    });

    

};

module.exports.help = {
    name: "backup-info",
    aliases: ["backupinfo"],
    category: "backup",
    enabled: true,
    description: "Permet de unwhitelist un membre."
};