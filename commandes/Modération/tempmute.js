module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const db = require("quick.db");
    const ms = require("ms");
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${emojis.non} Vous n'avez pas la permission pour utiliser cette commande.**`)
    if(!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**${emojis.non} Il me manque des permissions.**`)
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
    let time = args.slice(1).join(" ");
    if(!user) return message.channel.send(`**${emojis.non} Veuillez indiquez un membre.**`)
    if(!time) return message.channel.send(`**${emojis.non} Veuillez indiquez un temps valide.**`)
    let timems = ms(time)
    if(!timems) return message.channel.send(`**${emojis.non} Veuillez indiquez un temps valide.**`)
    if(message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send(`**${emojis.non} Vous ne pouvez pas mute ce membre.**`)

    message.guild.channels.cache.forEach(channel => {
        channel.updateOverwrite(user.id, { SEND_MESSAGES: false })
    });

    let embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`${emojis.oui} Succès :`)
    .setDescription(`**${emojis.fleched} ${user.user.tag} a bien été rendu muet pour la durée suivante : \`${time}\`.**`)
    .setColor("303136")
    .setFooter(client.user.username)

    message.channel.send(embed)

    function a(){
        message.guild.channels.cache.forEach(channel => {
            channel.updateOverwrite(user.id, { SEND_MESSAGES: null })
        });
    }
    setTimeout(a, timems)
};

module.exports.help = {
    name: "tempmute",
    aliases: [],
    category: "mod",
    enabled: true,
    description: "Permet de rendre muet temporairement un membre."
};