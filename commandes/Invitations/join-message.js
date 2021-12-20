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
    let joinmessage = args.slice(1).join(" ");
    let joinmessageconfig = new Discord.MessageEmbed()
      .setTitle(`<:IconInfo:864866445103988806> **Configuration du Message de Bienvenue**`)
      .setColor("303136")

      .setDescription(
        `**Veuillez** __utilisez__ la **commande** \`${prefix}joinmessage <message>\` pour **configurer** le messages de Bienvenue du Serveur.\n\n
        \`\`Variable du Bot\`\`
        {user} = *Nom du Membres*
        {inviter} = *Nom de l'inviteur*
        {createdat} = *Date de création du compte du membre*
        {guild} = *Nom du serveur*
      `
      )
      .setFooter(client.user.username, client.user.displayAvatarURL());
    if (!joinmessage) {
      return message.channel.send(joinmessageconfig);
    }
    let oldjoinmessage = db.get(`joinmessage_${message.guild.id}`);
    if (oldjoinmessage === null) oldjoinmessage = "None";
    let jointimesdata = db.get(
      `jointimes_${message.guild.id}_${message.author.id}`
    );
    if (jointimesdata === null) jointimesdata = "1";
    let joinmsgreplace = joinmessage
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
    .setTitle(`<:IconInfo:864866445103988806> **Configuration du Message de Bienvenue**`)
    .setColor("303136")

      .setDescription(
        `*Nouveau __message__ de Bienvenue définis.*\n\n${joinmsgreplace}`
      )
      .setFooter(client.user.username, client.user.displayAvatarURL());
    db.delete(`joinmessage_${message.guild.id}`);
    db.set(`joinmessage_${message.guild.id}`, joinmsgreplace);
    return message.channel.send(joinmessagevalueupdate);
  }
 
module.exports.help = {
    name: "join-message",
    aliases: ["joinmessage"],
    category: "invite",
    enabled: true,
    description: "Affiche les différents liens du bot."
};