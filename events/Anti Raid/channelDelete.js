module.exports = (client, channel) => {

    const Discord = require("discord.js");
    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");

    if(channel.type === "dm") return;
    if(db.get("whitelist_" + channel.guild.id) !== "on") return;
    
    channel.guild.fetchAuditLogs().then(e => { 

        if(e.entries.first().action === 'CHANNEL_DELETE' && !e.entries.first().executor.bot) {
            if(db.get("antichannel_" + channel.guild.id) !== "on") return;
            if(db.get("whitelist_" + channel.guild.id + "_" + e.entries.first().executor.id) !== true) {
                channel.clone().then(m => m.setPosition(channel.position)) 
                if(channel.guild.members.cache.get(e.entries.first().executor.id).bannable) channel.guild.members.cache.get(e.entries.first().executor.id).ban({reason: "Suppression d'un salon mais membre non whitelist."}) 
            }
        }

    })

};