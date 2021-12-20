module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const Discord = require("discord.js");

    const db = require("quick.db");
    const prefix = db.get(`prefix_${message.guild.id}`) || config.prefix;

    let ownerss = client.commands.filter(a => a.help.category === "ownerss").map(cmd => `${cmd.help.name}`).join(", ")
    let admin = client.commands.filter(a => a.help.category === "admin").map(cmd => `${cmd.help.name}`).join(", ")
    let antiraid = client.commands.filter(a => a.help.category === "antiraid").map(cmd => `${cmd.help.name}`).join(", ")
    let mod = client.commands.filter(a => a.help.category === "mod").map(cmd => `${cmd.help.name}`).join(", ")
    let logs = client.commands.filter(a => a.help.category === "logs").map(cmd => `${cmd.help.name}`).join(", ")
    let utils = client.commands.filter(a => a.help.category === "utils").map(cmd => `${cmd.help.name}`).join(", ")
    let fun = client.commands.filter(a => a.help.category === "fun").map(cmd => `${cmd.help.name}`).join(", ")
    let devs = client.commands.filter(a => a.help.category === "dev").map(cmd => `${cmd.help.name}`).join(", ")
    let gw = client.commands.filter(a => a.help.category === "gw").map(cmd => `${cmd.help.name}`).join(", ")
    let backup = client.commands.filter(a => a.help.category === "backup").map(cmd => `${cmd.help.name}`).join(", ")
    let invite = client.commands.filter(a => a.help.category === "invite").map(cmd => `${cmd.help.name}`).join(", ")
    let watch = client.commands.filter(a => a.help.category === "watch").map(cmd => `${cmd.help.name}`).join(", ")

    let embed = new MessageEmbed()
    .setTitle("<a:flechebleu:867322358104457226> Liste des commandes")
    .setDescription(`Préfixe : **${prefix}**`)
    .addField(`${emojis.owner} Développeur :`,  `\`\`\`${devs}\`\`\``)
    .addField(`${emojis.proprio} Propriétaire du serveur :`, `\`\`\`${ownerss}\`\`\``)
    .addField(`${emojis.settings} Administrations :`, `\`\`\`${admin}\`\`\``)
    .addField(`${emojis.protect} Auto Modération :`, `\`\`\`${antiraid}\`\`\``)
    .addField(`${emojis.logs} Logs :`, `\`\`\`${logs}\`\`\``)
    .addField(`${emojis.warn} Modération :`, `\`\`\`${mod}\`\`\``)
    .addField(`${emojis.backup} Sauvegarde :`,  `\`\`\`${backup}\`\`\``)
    .addField(`${emojis.invite} Invitation :`, `\`\`\`${invite}\`\`\``)
    .addField(`${emojis.tools} Utilitaire :`, `\`\`\`${utils}\`\`\``)
    .addField(`${emojis.fun} Fun :`,  `\`\`\`${fun}\`\`\``)
    .addField(`${emojis.together} Watch Together :`,  `\`\`\`${watch}\`\`\``)
    .addField(`${emojis.giveaway} Giveaway :`,  `\`\`\`${gw}\`\`\``)
    .setColor("303136")
    .setFooter(client.user.username, client.user.avatarURL())

    const help= new Discord.MessageEmbed()
    .setTitle("<a:flechebleu:867322358104457226> Aide")
    .setDescription(`Clique sur la réaction pour recevoir la liste de commande\n\n> Recevoir la liste de commande en **message privée** : ${emojis.mp}\n> Recevoir la liste de commande dans **ce salon** : ${emojis.channel}\n\nSi vous rencontrez un problème lors de ce message, contactez un fondateur.`)
    .setFooter(client.user.username, client.user.avatarURL())
    .setColor("303136")
    let msg = await message.channel.send(help)
    await msg.react('864870299840413726') && await msg.react('879681671912386560') 
      
    const collector = msg.createReactionCollector((react, user) => ['nsfw', 'channell'].includes(react.emoji.name) && user.id == message.author.id, { time: 2 * 60 * 1000 })
      
    collector.on('collect', (react) => {
        react.emoji.name == 'nsfw' && message.member.send(embed).catch(err => { message.channel.send(`**${emojis.non} Une erreur s'est produite, veuillez vérifiez que vos dm sont ouverts.**`) }) && msg.delete() && message.delete()
        react.emoji.name == 'channell' && message.channel.send(embed) && msg.delete() && message.delete()
    })

};

module.exports.help = {
    name: "help",
    aliases: ["h", "HELP", "Help"],
    category: "utils",
    enabled: true,
    description: "Montre la liste des commandes."
};