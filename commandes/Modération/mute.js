module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${emojis.non} Vous n'avez pas la permission pour utiliser cette commande.**`)
    if(!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**${emojis.non} Il me manque des permissions.**`)
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
    if(!user) return message.channel.send(`**${emojis.non} Veuillez indiquez un membre.**`)
    if(message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send(`**${emojis.non} Vous ne pouvez pas mute ce membre.**`)

    message.guild.channels.cache.forEach(channel => {
        channel.updateOverwrite(user.id, { SEND_MESSAGES: false })
    });

    let embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`${emojis.oui} Succès :`)
    .setDescription(`**${emojis.fleched} ${user.user.tag} a bien été rendu muet.**`)
    .setColor("303136")
    .setFooter(client.user.username)

    message.channel.send(embed)

};

module.exports.help = {
    name: "mute",
    aliases: [],
    category: "mod",
    enabled: true,
    description: "Permet de rendre muet un membre."
};