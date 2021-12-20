module.exports = ( client, channel ) => {
  
    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    if(channel.type === "dm") return;
    if(db.get("whitelist_" + channel.guild.id) !== "on") return;
    
    channel.guild.fetchAuditLogs().then(e => { 

        if(e.entries.first().action === 'WEBHOOK_CREATE' && !e.entries.first().executor.bot) {
            if(db.get("antiwebhook_" + channel.guild.id) !== "on") return;
            if(db.get("whitelist_" + channel.guild.id + "_" + e.entries.first().executor.id) !== true) {
                e.entries.first().target.delete()
                if(channel.guild.members.cache.get(e.entries.first().executor.id).bannable) channel.guild.members.cache.get(e.entries.first().executor.id).ban({reason: "Création d'une webhook mais membre non whitelist."}) 
            }
        }

    })

  };