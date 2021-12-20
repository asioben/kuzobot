module.exports = (client, member) => {

    const Discord = require("discord.js");
    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");

    if(db.get("whitelist_" + member.guild.id) !== "on") return;

    member.guild.fetchAuditLogs().then(e => { 

        if(e.entries.first().action === 'BOT_ADD') {
            if(db.get("antibot_" + member.guild.id) !== "on") return;
            if(db.get("whitelist_" + member.guild.id + "_" + e.entries.first().executor.id) !== true) {
                member.kick()
                if(member.guild.members.cache.get(e.entries.first().executor.id).bannable) member.guild.members.cache.get(e.entries.first().executor.id).ban({reason: "Ajout d'un bot mais membre non whitelist."}) 
            }
        }

    })

};