module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const prefix = require("quick.db").get(`prefix_${message.guild.id}`) || config.prefix;

    if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.channel.send(`Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
 
             filter = (reaction, user) => ['1️⃣', '2️⃣','3️⃣'].includes(reaction.emoji.name) && user.id === message.author.id,
        dureefiltrer = response => { return response.author.id === message.author.id };
     
        const msgembed = new MessageEmbed()
        .addField("<a:queue:864868562233196614>  Configuration de L\'**autorole**", 'Veuillez **cliquer sur la réaction** ci-contre pour __configurer__ l\'**autorole**')
     
         message.channel.send(msgembed)
         .then(async m => { 
     const collector = m.createReactionCollector(filter, { time: 900000 });
     collector.on('collect', async r => { 

                if(r.emoji.name === "1️⃣") {
                    message.channel.send(`<a:queue:864868562233196614> *Veuillez __entrée__ l'__ID__ du __rôle__ à configurer.*`).then(mp => {
                        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
                        .then(cld => {
                        var msg = cld.first();
                        var role = message.guild.roles.cache.get(msg.content)
                        if(!role) return  message.channel.send(`Rôle incorrect.`);
                        db.set("autorole_role_" + message.guild.id, role.id)
                        
                                     message.channel.send(`<:IconInfo:864866445103988806> **Vous venez de __changer__ le rôle en \`${role.name}\`**`)
                                     m.edit({ embed: { title: `<a:queue:864868562233196614>  Configuration de L'**autorole**`, description: 'Veuillez **cliquer sur la réaction** ci-contre pour __configurer__ l\'**autorole**',  } });         
                                    });
                  

                                
                                        
                                
                                
                });
       
         }
     });
     await m.react("1️⃣")

         });

};

module.exports.help = {
    name: "autorole",
    aliases: [],
    category: "admin",
    enabled: true,
    description: "Permet de modifier le préfixe du bot."
};