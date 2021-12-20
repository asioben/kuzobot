module.exports = (client, member, message) => {
    const Discord = require("discord.js");
    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");


                role = db.fetch("autorole_role_" + member.guild.id)

                if(!role) return;
                member.roles.add(role)

                
            
        

    

};