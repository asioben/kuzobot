const config = require("../../jsons/config.json");
const emojis = require("../../jsons/emojis.json");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {


    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(' Vous devez disposer de plus de permissions pour relancer les Giveaway.');
    }

    
    if(!args[0]){
        return message.channel.send('${emojis.non} Vous devez spécifier un ID de message valide !');
    }

    
    let giveaway = 
    
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ') && g.guildID === message.guild.id) ||
    
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0] && g.guildID === message.guild.id);

    
    if(!giveaway){
        return message.channel.send('Impossible de trouver un Giveaway pour`'+ args.join(' ') +'`.');
    }

    
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        
        message.channel.send('Giveaway relancé !');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway avec ID de message ${giveaway.messageID} n'est pas terminé.`)){
            message.channel.send('This giveaway n\'est pas terminé!');
        } else {
            console.error(e);
            message.channel.send('Une erreur c\'est produite');
        }
    });

};

module.exports.help = {
    name: "reroll",
    aliases: ['greroll','giveawayreroll'],
    category: 'gw',
    description: "- Re-sélectionne un gagnant du dernier giveaway.",
  };