module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const db = require("quick.db");
    const prefix = db.get(`prefix_${message.guild.id}`) || config.prefix;

    text = `${args.join(" ")}`;
    if (text && !message.mentions.users.size) {
        const ids = Array(text.split(" "));
        ids.forEach(x => {
            x.forEach(async y => {
                if (isNaN(y)) return message.reply(`\`${y}\` n'est pas une ID valide.`);
                if (y.length < 18) return message.reply(`\`${y}\` n'est pas assez long pour être une ID.`);

                const user = await client.users.fetch(y);

                const aIDEmbed = new MessageEmbed()
                .setTitle(`Avatar de ${user.tag}`)
                .setImage(user.displayAvatarURL({ dynamic: true }))

                message.channel.send(aIDEmbed);
             })
        })
    } else if (!message.mentions.users.size) {
        const avatar1Embed = new MessageEmbed()
        .setDescription("**Voici ton avatar**")
        .setImage(message.author.displayAvatarURL({ dynamic: true }))
        return message.channel.send(avatar1Embed);
    }

    const avatarList = message.mentions.users.map(user => {
        const avatar2Embed = new MessageEmbed()
        .setDescription(`**Voici l'avatar de ${user.tag}**`)
        .setImage(user.displayAvatarURL({ dynamic: true }))
      return message.channel.send(avatar2Embed)
    });


    
};

module.exports.help = {
    name: "pic",
    aliases: ["avatar", "logo", "pp"],
    category: "utils",
    enabled: true,
    description: "Affiche les différents liens du bot."
};