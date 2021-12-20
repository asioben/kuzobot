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
   let leavemessage = args.slice(1).join(" ");
   let defaultleavemessage = "**{user}** vient de nous quitter, il avait été invité par **{inviter}**"

   let leavemessageconfig = new Discord.MessageEmbed()
   .setTitle(`<:IconInfo:864866445103988806> **Configuration du Message d'Aurevoir**`)
     .setDescription(
        `Veuillez utilisez la commande \`${prefix}leavemessage <message>\` pour configurer le messages.\n\n
        \`\`Variable du Bot\`\`
      {user} = Nom du Membres
      {inviter} = Nom de l'inviteur
      {createdat} = Date de création du compte du membre
      {guild} = Nom du serveur
      `
     )
     .setFooter(client.user.username, client.user.displayAvatarURL());
   if (!leavemessage) {
     return message.channel.send(leavemessageconfig);
   }
   let oldleavemessage = db.get(`leavemessage_${message.guild.id}`);
   if (oldleavemessage === null) oldleavemessage = "None";
   let leavemsgreplace = leavemessage
     .toLowerCase()
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString());
   let joinmessagevalueupdate = new Discord.MessageEmbed()
   .setTitle(`<:IconInfo:864866445103988806> **Configuration du Message d'Aurevoir**`)
   .setColor("303136")

     .setDescription(
       `** Nouvelle valeur **\n${leavemsgreplace}`
     )
     .setFooter(client.user.username, client.user.displayAvatarURL());
   db.delete(`leavemessage_${message.guild.id}`);
   db.set(`leavemessage_${message.guild.id}`, leavemsgreplace);
   return message.channel.send(joinmessagevalueupdate);
 }
module.exports.help = {
    name: "leave-message",
    aliases: ["leavemessage"],
    category: "invite",
    enabled: true,
    description: "Affiche les différents liens du bot."
};