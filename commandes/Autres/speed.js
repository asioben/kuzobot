module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    const Embed = new MessageEmbed()
    .setTitle("<a:flechebleu:867322358104457226> __**Temps de réponse**__")
    .addField('**Temps de réponse du bot**' , `${client.ws.ping}ms`)
    .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
    .setTimestamp()  
    .setColor("303136")
    message.channel.send(Embed)
    
};

module.exports.help = {
    name: "speed",
    aliases: ["ping", "ms"],
    category: "utils",
    enabled: true,
    description: "Affiche les différents liens du bot."
};