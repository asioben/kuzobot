module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const axios = require('axios');
    fs = require("fs");

    const url = `http://some-random-api.ml/binary?text=${args}`;

    let response, data;
    try {
        response = await axios.get(url);
        data = response.data;
    } catch (e) {
        return message.channel.send(`:warning: Une erreur s'est produite, veuillez réessayer!`)
    }

    const embed = new MessageEmbed()
        .setTitle('Texte en binaire')
        .setDescription(data.binary)
        .setColor(`${db.color}`)
        .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
        .setTimestamp()  
        .setColor("303136")
             message.channel.send(embed)
};


module.exports.help = {
    name: "binary",
    aliases: ["binaire"],
    category: "fun",
    enabled: true,
    description: "Convertie votre text en ascii."
};