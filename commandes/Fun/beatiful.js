module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const figlet = require('figlet')
    const fs = require("fs");
    const member = message.mentions.users.first();
    const DIG = require("discord-image-generation");
    var Discord = require("discord.js");

    let avatar;
if(member){
    avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
}else {
    avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
}
let img = await new DIG.Beautiful().getImage(`${avatar}`);
let attach = new Discord.MessageAttachment(img, "delete.png");
message.channel.send(attach);
 
}

module.exports.help = {
    name: "beatiful",
    aliases: ["btfl"],
    category: "fun",
    enabled: true,
    description: "Convertie votre text en ascii."
};