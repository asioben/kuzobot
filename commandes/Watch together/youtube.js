module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const fetch = require("node-fetch")
    const { MessageButton, MessageActionRow } = require('discord-buttons');
    const Discord = require('discord.js');

    
        var novc = new Discord.MessageEmbed()
        
        .setTitle("Oulaa !")
        .setDescription("> Tu n'es pas dans un salon vocal")
        .setColor("303136")
        var poker = new Discord.MessageEmbed()
        
        .setTitle("Youtube")
        .setDescription("> Appuie sur le boutton pour regarder **Youtube** !")
        .setColor("303136")


            let channel = message.member.voice.channel;
            if(!channel) return message.channel.send(novc)

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "768053002320740364",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${config.token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(invite => {
    console.log("sh https://discord.com/invite/" + invite.code)
    if(!invite.code) return message.channel.send("Je peux pas commencer une partie de **Youtube** !")
        
let wtf = new MessageButton()
.setStyle('url')
.setLabel('▶️ Watch') 
.setURL(`https://discord.com/invite/${invite.code}`)


message.channel.send("", { buttons: [wtf], embed: poker})
})
}

module.exports.help = {
    name: "youtube",
    aliases: ["ytb", "yt", "y"],
    category: "watch",
    enabled: true,
    description: "Affiche la liste des personnes owner."
};