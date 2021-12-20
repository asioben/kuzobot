module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const db = require("quick.db");
    const prefix = db.get(`prefix_${message.guild.id}`) || config.prefix;
    const user = message.mentions.users.first() || message.author;

    let inv = db.fetch(`invites_${message.guild.id}_${user.id}`);
    let leaves = db.fetch(`leaves_${message.guild.id}_${user.id}`);
    let Regular = db.fetch(`Regular_${message.guild.id}_${user.id}`);
    let bonus = db.fetch(`bonus_${message.guild.id}_${user.id}`);
    text = `${args.join(" ")}`;
    if (text && !message.mentions.users.size) {
        const ids = Array(text.split(" "));
        ids.forEach(x => {
            x.forEach(async y => {
                if (isNaN(y)) return message.reply(`\`${y}\` n'est pas une ID valide.`);
                if (y.length < 18) return message.reply(`\`${y}\` n'est pas assez long pour être une ID.`);

                const user = await client.users.fetch(y);

                const aIDEmbed = new MessageEmbed()
                const avatar2Embed = new MessageEmbed()
                .setTitle(`**${user.tag} à ${inv || 0} invitations**`)
                .setDescription(`**${Regular || 0}** ordinaires\n**${bonus || 0}** bonus \n**${leaves || 0} **parties`)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setColor("303136")


                message.channel.send(aIDEmbed);
             })
        })
    } else if (!message.mentions.users.size) {
        const avatar1Embed = new MessageEmbed()
        .setTitle(`**Vous avez ${inv || 0} invitations**`)
        .setDescription(`**${Regular || 0}** ordinaires\n**${bonus || 0}** bonus \n**${leaves || 0} **parties`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setColor("303136")

        return message.channel.send(avatar1Embed);
    }

    const avatarList = message.mentions.users.map(user => {
        const avatar2Embed = new MessageEmbed()
        .setTitle(`**${user.tag} à ${inv || 0} invitations**`)
        .setDescription(`**${Regular || 0}** ordinaires\n**${bonus || 0}** bonus \n**${leaves || 0} **parties`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setColor("303136")

      return message.channel.send(avatar2Embed)
    });


    
};

module.exports.help = {
    name: "invites",
    aliases: [],
    category: "invite",
    enabled: true,
    description: "Affiche les différents liens du bot."
};