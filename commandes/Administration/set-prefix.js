module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const prefix = require("quick.db").get(`prefix_${message.guild.id}`) || config.prefix;

    if(message.member.hasPermission("ADMINISTRATOR")) {

        if(prefix === args[0]) return message.channel.send(`**${emojis.non} Veuillez indiquez un préfixe différent du préfixe actuel.**`)
        if(!args.join(" ")) return message.channel.send(`**${emojis.non} Veuillez indiquez un nouveau préfixe.**`)
        if(args.join(" ").length > 10 ) return message.channel.send(`**${emojis.non} Veuillez indiquez un préfixe de maximum \`10\` caractères.**`)
        

        let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${emojis.oui} Succès :`)
        .setDescription(`**${emojis.fleched} Le préfixe a bien été modifié en \`${args.join(" ")}\`.**`)
        .setColor("303136")
        .setFooter(client.user.username)

        db.set("prefix_" + message.guild.id, args.join(" "))
        return message.channel.send(embed)

    } else {

        return message.channel.send(`**${emojis.non} Vous n'avez pas la permission nécessaire pour utiliser cette commande.**`)

    }
 
};

module.exports.help = {
    name: "set-prefix",
    aliases: ["prefix", "setp", "sp"],
    category: "admin",
    enabled: true,
    description: "Permet de modifier le préfixe du bot."
};