module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const figlet = require('figlet')
    const fs = require("fs");
    
    if(!args[0]) return message.channel.send('<:no:867322302693244978> Veuillez fournir du texte');

    msg = args.join(" ");

    figlet.text(msg, function (err, data){
        if(err){
            console.log(' Quelque chose s\'est mal passé');
            console.dir(err);
        }
        if(data.length > 2000) return message.channel.send('<:warn:867323379623395328> Veuillez fournir un texte de moins de 2000 caractères')

        message.channel.send('```' + data + '```')
    })}


    module.exports.help = {
            name: "ascii",
            aliases: ["ascii"],
            category: "fun",
            enabled: true,
            description: "Convertie votre text en ascii."
        };