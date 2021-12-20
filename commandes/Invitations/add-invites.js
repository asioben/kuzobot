module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    require('discord-reply');

    const db = require("quick.db");
    const prefix = db.get(`prefix_${message.guild.id}`) || config.prefix;

  
    if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.channel.send(`Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
 
     
    let user = message.mentions.users.first();
 
    if (!user)
    return message.channel.send('Merci de **mentionner** un **utilisateur**');

      
       let amount = args[1];
 
       if (!amount)
         return message.channel.send(`Veuillez spécifier un **nombres** d'invitation à ajouter`);

 
       db.add(`invites_${message.guild.id}_${user.id}`, amount);
 
 message.channel.send(`Je viens d’ajouter **${amount}** invitations a **${user}**`)
       db.add(`bonus_${message.guild.id}_${user.id}`, amount);
     
 
 };
module.exports.help = {
    name: "add-invites",
    aliases: ["add-invite"],
    category: "invite",
    enabled: true,
    description: "Affiche les différents liens du bot."
};