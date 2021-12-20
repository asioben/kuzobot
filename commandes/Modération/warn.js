module.exports.run = async (client, message, args, channel, guild) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    let author = message.mentions.members.first();
    let member = message.mentions.members.first();
    if(db.get("whitelist_" + message.guild.id + "_" + message.member.id) !== true) return message.channel.send(`**${emojis.non} Vous devez être whitelist pour utiliser cette commande.**`)


        const user = message.mentions.members.first()
    
        if(!user) {
          return 
        }
        
        if(message.mentions.users.first().bot) {
          return 
        }
        
        if(message.author.id === user.id) {
          return
        }
        
        const reason = args.slice(1).join(" ")
        
        
        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
        
        
        if(warnings === null) {
          db.set(`warnings_${message.guild.id}_${user.id}`, 1)
          user.send(`Vous avez été **warn** sur ${message.guild.name}`)
          await message.channel.send(`${message.mentions.users.first().username} à été **warn**`)
        } else if(warnings !== null) {
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
           user.send(`Vous avez été **warn** sur ${message.guild.name}`)
          await message.channel.send(`${message.mentions.users.first().username} à été **warn**`)
        }

};

module.exports.help = {
    name: "warn",
    aliases: [],
    category: "mod",
    enabled: true,
    description: "Permet de unwhitelist un membre."
};