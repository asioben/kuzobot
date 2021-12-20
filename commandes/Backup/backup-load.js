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

    backup.fetch(backupID).then(() => {

        message.channel.send('Êtes vous sur? Veuillez envoyer `confirm` ou `cancel`!');

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['confirm', 'cancel'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === 'confirm';
            collector.stop();
            if (confirm) {

                backup.load(backupID, message.guild).then(() => {

                    return message.author.send('**La backup à été load**');
            
                }).catch((err) => {
            
                    if (err === 'No backup found')
                        return message.channel.send('**Aucune backup trouver**');
                    else
                        return message.author.send(':x: **Erreur**: '+(typeof err === 'string') ? err : JSON.stringify(err));
            
                });

            } else {
                return message.channel.send('**Annuler**.');
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
            return message.channel.send('**Annuler**.');
        })

    }).catch(() => {
        return message.channel.send('**Une erreur est survenue**');

    });

    

};

module.exports.help = {
    name: "backup-load",
    aliases: ["backupload"],
    category: "backup",
    enabled: true,
    description: "Permet de unwhitelist un membre."
};  