module.exports.run = async (client, message, args) => {

    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${emojis.non} Vous n'avez pas la permission pour utiliser cette commande.**`)
    if(!args[0]) return message.channel.send(`**${emojis.non} Veuillez indiquez un nombre entre \`1\` & \`100\`.**`)
    if(isNaN(args[0])) return message.channel.send(`**${emojis.non} Veuillez indiquez un nombre entre \`1\` & \`100\`.**`)
    if(args[0] < 1) return message.channel.send(`**${emojis.non} Veuillez indiquez un nombre entre \`1\` & \`100\`.**`)
    if(args[0] > 100) return message.channel.send(`**${emojis.non} Veuillez indiquez un nombre entre \`1\` & \`100\`.**`)

    let embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`${emojis.oui} Succès :`)
    .setDescription(`**${emojis.fleched} \`${args[0]}\` messages supprimés avec succès.**`)
    .setColor("303136")
    .setFooter(client.user.username)

    message.delete()
    message.channel.bulkDelete(args[0])
    let msg = await message.channel.send(embed)

    function del(){
        msg.delete()
    }
    setTimeout(del, 2500)

};

module.exports.help = {
    name: "clear",
    aliases: [],
    category: "mod",
    enabled: true,
    description: "Permet de supprimer des messages rapidement."
};