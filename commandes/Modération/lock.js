module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${emojis.non} Vous n'avez pas la permission pour utiliser cette commande.**`)
    if(!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**${emojis.non} Il me manque des permissions.**`)
    
    message.channel.updateOverwrite(message.guild.id, {
        SEND_MESSAGES: false
    });

    let embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`${emojis.oui} Succès :`)
    .setDescription(`**${emojis.fleched} Le salon a bien été fermé.**`)
    .setColor("303136")
    .setFooter(client.user.username)

    message.channel.send(embed)

};

module.exports.help = {
    name: "lock",
    aliases: [],
    category: "mod",
    enabled: true,
    description: "Permet de fermer un salon textuel."
};