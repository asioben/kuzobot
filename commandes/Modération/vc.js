module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const db = require("quick.db");
    const Discord = require("discord.js")

    var connectedCount = 0;
    var streamingCount = 0;
    var mutedCount = 0;
    var mutedMic = 0;
    var cameraCount =0;
    const channels = message.guild.channels.cache.filter(c => c.type === 'voice');
    channels.forEach(c => {
        connectedCount += c.members.size;
        c.members.forEach(m => {
            if(m.voice.streaming) streamingCount++;
            if(m.voice.selfDeaf || m.voice.serverDeaf) mutedCount++;            
            if(m.voice.selfMute || m.voice.serverMute) mutedMic++;
            if(m.voice.selfVideo) cameraCount++;
        })
    })
    const voiceConnectedEmbed = new Discord.MessageEmbed()            
        .addField('Statistiques vocal',`**${connectedCount}** membre(s) en vocal.\n**${streamingCount}** membre(s) sont en stream.\n**${mutedMic}** membre(s) sont mute micro.\n**${mutedCount}** membre(s) sont mute casque.\n**${cameraCount}** membre(s) sont en caméra.`)
        .setColor("303136")
        .setFooter(message.guild.name)
    message.channel.send(voiceConnectedEmbed);

 

};

module.exports.help = {
    name: "vc",
    aliases: ["vocal"],
    category: "mod",
    enabled: true,
    description: "Affiche la liste des personnes owner."
};