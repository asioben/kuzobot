module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const db = require("quick.db");
    const ms = require("ms");
    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
    let time = args.slice(1).join(" ");
    if(db.get("whitelist_" + message.guild.id + "_" + message.member.id) !== true) return message.channel.send(`**${emojis.non} Vous devez être whitelist pour utiliser cette commande.**`)
    if(!user) return message.channel.send(`**${emojis.non} Veuillez indiquez un membre.**`)
    if(!time) return message.channel.send(`**${emojis.non} Veuillez indiquez un temps valide.**`)
    let timems = ms(time)
    if(!timems) return message.channel.send(`**${emojis.non} Veuillez indiquez un temps valide.**`)
    if(message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send(`**${emojis.non} Vous ne pouvez pas bannir ce membre.**`)
    if(!user.bannable) return message.channel.send(`**${emojis.non} Je ne peux pas bannir ce membre.**`)

    let embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`${emojis.oui} Succès :`)
    .setDescription(`**${emojis.fleched} ${user.user.tag} a bien été banni pour la durée suivante : \`${time}\`.**`)
    .setColor("303136")
    .setFooter(client.user.username)

    user.ban()
    message.channel.send(embed) 

    function a(){
        message.guild.members.unban(user.id)
    }
    setTimeout(a, timems)
};

module.exports.help = {
    name: "tempban",
    aliases: [],
    category: "mod",
    enabled: true,
    description: "Permet de bannir temporairement un membre."
};