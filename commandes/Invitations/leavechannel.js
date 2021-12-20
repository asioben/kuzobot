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
   let leavechanneldata = db.get(`leavechannelmessage_${message.guild.id}`);
   if (leavechanneldata === null) leavechanneldata = "none";

   let leavechannel = message.mentions.channels.first();
   let leavemessageembed = new Discord.MessageEmbed()
   .setTitle(`<:IconInfo:864866445103988806> **Configuration du salon d'Aurevoir**`)
   .setColor("303136")

     .setDescription(
        `Veuillez utilisez la commande \`${prefix}leavechannel <message>\` pour configurer le salon.`

     )
     .setFooter(client.user.username, client.user.displayAvatarURL());
   if (!leavechannel) {
     return message.channel.send(leavemessageembed);
   }
   const leavemessageupdated = new Discord.MessageEmbed()
   .setTitle(`<:IconInfo:864866445103988806> **Configuration du Salon d'Aurevoir**`)
   .setColor("303136")

     .setDescription(
      `*Nouveau __salon__ d'aurevoir définis.*: <#${leavechannel.id}>`

     )
     .setFooter(client.user.username, client.user.displayAvatarURL());
   db.delete(`leavechannelmessage_${message.guild.id}`);
   db.set(`leavechannelmessage_${message.guild.id}`, leavechannel.id);
   return message.channel.send(leavemessageupdated);
 }
module.exports.help = {
    name: "leave-channel",
    aliases: ["leavechannel"],
    category: "invite",
    enabled: true,
    description: "Affiche les différents liens du bot."
};