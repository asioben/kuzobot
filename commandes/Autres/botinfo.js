module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const Discord = require('discord.js');
    const moment = require('moment')

        let msg = await message.channel.send(`${emojis.load} **Récupération des informations en cours , veuillez patienter....**`)
        let apo = ["271713026929852416"]
        let sudry = ["811856664713625641"]
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Mes statistiques`, message.client.user.displayAvatarURL())
        .setDescription(`:id: ・ ID : **${message.client.user.id}**\n:bust_in_silhouette: ・ Crée le : **${moment(message.client.user.createdTimestamp).locale('fr').format('LT ,')} ${moment(message.client.user.createdTimestamp).locale('fr').format('LL, ')} ${moment(message.client.user.createdTimestamp).locale('fr').fromNow()}**\n:record_button: ・ Certification : **Non**\n\n> **Informations :**\n:desktop: ・ Serveurs : **${message.client.guilds.cache.size}**\n:family_man_woman_boy: ・ Utilisateurs : **${message.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}**\n:receipt: ・ Commandes au total : **${message.client.commands.size}**\n:gear: ・ Version : **1.0.0**\n\n:chart_with_downwards_trend: ・ Language : **Discord.JS@${Discord.version}**\n:computer: ・ Développeurs : **<@271713026929852416>** & **<@394103063520215042>**\n:crown: ・ Créateurs : **<@271713026929852416>**, **<@394103063520215042>**, **<@852955723771019265>**, **<@608792025784909825>** & **<@811856664713625641>**\n:pencil2: ・ Designer : <@608792025784909825>`)
        .setColor("303136")
        .setFooter(client.user.username)

        setTimeout(() => {
            msg.edit(null, { embed: embed })
        }, 3000);
    },

module.exports.help = {
    name: "botinfo",
    aliases: ["stats", "bi", "botinfos"],
    category: "utils",
    enabled: true,
    description: "Affiche des informations concernant le bot."
    };