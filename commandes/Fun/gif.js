module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    fs = require("fs");
    const fetch = require('node-fetch');
    


   if (args > 50) {
            return message.reply('Oups, ce que vous me demandez est trop précis pour être trouvé!');
        }

        fetch(`https://api.tenor.com/v1/random?key=VMUXIB2ND575&q=${args}&limit=1`)
            .then(res => res.json())
            .then(json => message.channel.send(json.results[0].url))
            .catch(e => {
                message.channel.send('Impossible de trouver un gif correspondant à votre requête');
                
                return;
            });

};


module.exports.help = {
    name: "gif",
    aliases: ["gif"],
    category: "fun",
    enabled: true,
    description: "Convertie votre text en ascii."
};