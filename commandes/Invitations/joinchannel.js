module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    require('discord-reply'); //:warning: IMPORTANT: put this before your discord.Client()
    const Discord = require("discord.js");

    const db = require("quick.db");
    const prefix = db.get(`prefix_${message.guild.id}`) || config.prefix;

  
    if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.lineReply(`**Désolé**, mais vous **n'avez** pas la __permission__ requise pour __executer__ cette **commande**.`);
    let joinchannelmessagedata = db.get(
     `joinchannelmessage_${message.guild.id}`
   );
   if (joinchannelmessagedata === null) joinchannelmessagedata = "none";
   let joinchannel = message.mentions.channels.first();
   let joinchannelmessage = new Discord.MessageEmbed()
   .setTitle(`<:IconInfo:864866445103988806> **Configuration du Salon de Bienvenue**`)
   .setColor("303136")

     .setDescription(
      `**Veuillez** __utilisez__ la **commande** \`${prefix}joinchannel <salon>\` pour **configurer** le salon de Bienvenue du Serveur.\n\n

         `
     )
     .setFooter(client.user.username, client.user.displayAvatarURL());
   if (!joinchannel) {
     return message.channel.send(joinchannelmessage);
   }
   const joinmessageupdated = new Discord.MessageEmbed()
   .setTitle(`<:IconInfo:864866445103988806> **Configuration du Salon de Bienvenue**`)
   .setColor("303136")

     .setDescription(
       `Nouveau Salon de Bienvenue définis : <#${joinchannel.id}>`
     )
     .setFooter(client.user.username, client.user.displayAvatarURL());
   db.delete(`joinchannelmessage_${message.guild.id}`);
   db.set(`joinchannelmessage_${message.guild.id}`, joinchannel.id);
   return message.channel.send(joinmessageupdated);
 }
module.exports.help = {
    name: "join-channel",
    aliases: ["joinchannel"],
    category: "invite",
    enabled: true,
    description: "Affiche les différents liens du bot."
};