const config = require("../../jsons/config.json");
const emojis = require("../../jsons/emojis.json");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {

    
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('<:no:867322302693244978> Vous devez disposer des autorisations de gestion des messages pour relancer les GiveAway.');
    }

 
    if(!args[0]){
        return message.channel.send('<:no:867322302693244978> Vous devez spécifier un ID de message valide !');
    }

        
    let giveaway = 
    
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ') && g.guildID === message.guild.id) ||
   
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0] && g.guildID === message.guild.id);

    
    if(!giveaway){
        return message.channel.send('Impossible de trouver un GiveAway pour `'+ args.join(' ') + '`.');
    }

    
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
   
    .then(() => {
        
        message.channel.send('Le GiveAway se terminera dans moins de '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' secondes...');
    })
    .catch((e) => {
        if(e.startsWith(`GiveAway avec ID de message ${giveaway.messageID} est déjà terminé.`)){
            message.channel.send('Ce GiveAway est déjà terminé !');
        } else {
            console.error(e);
            message.channel.send('Une erreur s\'est produite...');
        }
    });

};

module.exports.help = {
    name: "gend",
    aliases: ['end-gw','g-end'],
    category: 'gw',
    description: "- Re-sélectionne un gagnant du dernier giveaway.",
  };