module.exports.run = async (client, message, args) => {
    const Discord = require('discord.js');
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const db = require("quick.db");

            if (message.guild.memberCount !== message.guild.members.cache.size) await message.guild.members.fetch()

            const embed = new Discord.MessageEmbed()

            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
                .setTitle(message.guild.name);
            if (message.guild.description) embed.setDescription(message.guild.description);
            embed.setColor(message.client.color)
            embed.addField(`Membres [${message.guild.memberCount}]`, `
        ${emojis.membres} **Compte:** ${message.guild.memberCount}/${message.guild.maximumMembers}
        ${emojis.bot} **Bots:** ${message.guild.members.cache.filter(m => m.user.bot).size}
        ${emojis.staff} **Staff:** ${message.guild.members.cache.filter(m => m.permissions.has(["BAN_MEMBERS", "MANAGE_MESSAGES", "KICK_MEMBERS", "MANAGE_GUILD", "ADMINISTRATOR"])).size}
        ${emojis.allstatus} **Statut des membres:** ${emojis.on} ${message.guild.members.cache.filter(m => ["dnd", "idle", "online"].includes(m.user.presence.status)).size} ${emojis.off} ${message.guild.members.cache.filter(m => m.user.presence.status === "offline").size}`)
            embed.addField(`Global`, `
${emojis.id} **Identifiant :** ${message.guild.id}
${emojis.regions} **Région :** ${message.guild.region.charAt(0).toUpperCase() + message.guild.region.slice(1)}
${emojis.channel} **Salons :** ${message.guild.channels.cache.size}
${emojis.banniere} Bannière: ${message.guild.banner ? `[lien](${message.guild.bannerURL({size: 1024})})` : "Aucune"}
${emojis.boost} **Boosts** : ${message.guild.premiumSubscriptionCount} , \`Niveau ${message.guild.premiumTier} \`
${emojis.couronne} **Owner** : \`${message.guild.owner ? message.guild.owner.user.tag : "Utilisateur Inconnu"}\` (<@!${message.guild.ownerID}>)
`)
embed.addField(`Autres`, `
${emojis.membres} **Rôles**: ${message.guild.roles.cache.size > 10 ? `${message.guild.roles.cache.map(x => `<@&${x.id}>`).slice(0,10 )} Et **${message.guild.roles.cache.size - 10}** autres rôles ` : message.guild.roles.cache.map(x => `<@&${x.id}>`)}
${emojis.emojis} **Emojis**: ${message.guild.emojis.cache.size > 10 ? `${message.guild.emojis.cache.map(x => `${x}`).slice(0,10 )} Et **${message.guild.emojis.cache.size - 10}** autres emojis ` : message.guild.emojis.cache.map(x => `${x}`)}
`)
if(message.guild.splash) embed.setImage(url = message.guild.splashURL())
        embed.setThumbnail(message.guild.icon ? message.guild.iconURL({dynamic:true}) : "https://cdn.discordapp.com/attachments/748897191879245834/782271474450825226/0.png?size=128")
        embed.setFooter(client.user.username, message.client.user.displayAvatarURL({ dynamic: true, size: 512 }))
        embed.setColor ("303136")

        message.channel.send(embed)

};


module.exports.help = {
    name: "serverinfo",
    aliases: ["si", "serveur-info", "serv-info"],
    category: "utils",
    enabled: true,
    description: "Donne toutes le informations disponibles sur le serveur."
                
};