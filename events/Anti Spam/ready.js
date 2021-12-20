module.exports = ( client, message ) => {
    
  const db = require("quick.db");
  const config = require("../../jsons/config.json");
  const emojis = require("../../jsons/emojis.json");

  const AntiSpam = require('discord-anti-spam');
  const antiSpam = new AntiSpam({
      warnThreshold: 3, 
      kickThreshold: 5,
      maxInterval: 2000,
      warnMessage: `**${emojis.non} {@user}, veuillez arrêter de spammer. Vous serez expulsé si vous continuer.**`, 
      kickMessage: `**${emojis.oui} {@user} a été expulsé pour spam.**`, 
      maxDuplicatesWarning: 7, 
      maxDuplicatesKick: 10, 
      exemptPermissions: ['ADMINISTRATOR'], 
      ignoreBots: true, 
      verbose: true, 
      ignoredUsers: []
  });
  
  client.on('message', (message) => {

    if(message.channel.type === "dm") return;
    if(db.get("antispam_" + message.guild.id) !== "on") return;
    antiSpam.message(message)
    
  }); 

};