module.exports.run = async (client, message, args, channel, guild) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    let author = message.mentions.members.first();
    let member = message.mentions.members.first();

        let staffc = await db.fetch(`owner__${message.author.id}`)
        if(staffc === 0 || staffc === null) return message.channel.send(`**${emojis.non} Vous n'êtes pas owner.**`)

        const user = message.mentions.members.first()
    
        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    
        if(warnings === null) warnings = 0;
        
        
        message.channel.send(`${user} posséde **${warnings}** avertissement(s)`)
    
      

};

module.exports.help = {
    name: "warnings",
    aliases: ["sanctions"],
    category: "mod",
    enabled: true,
    description: "Permet de unwhitelist un membre."
};