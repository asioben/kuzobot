module.exports.run = async (client, message, args, member) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const db = require('quick.db')

    let list = [];
    message.guild.emojis.cache.map(em => {

        list.push(`${em.toString()} \`\-\`\ :${em.name}:`)
    })

    message.channel.send(list.sort().join("\n"), { split: true })
};

module.exports.help = {
    name: "emojis-list",
    aliases: ["emojis", "emoji"],
    category: "utils",
    enabled: true,
    description: "Affiche les différents liens du bot."
};