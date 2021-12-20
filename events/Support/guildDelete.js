const { MessageEmbed } = require("discord.js")

module.exports = ( client, guild ) => {
    
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const moment = require("moment");

    const salon = client.channels.cache.get("881878633118064661");

    let embed = new MessageEmbed()
    .setTitle(`${emojis.fleched} On m'as retirer du serveur **${guild.name}** qui appartient à **${guild.owner.user.tag}**. Je suis maintenant sur **${client.guilds.cache.size}**`)
    .addField("__**Informations sur le serveur**__", [
        `> ${emojis.banniere} Nom du serveur : ${guild.name}`,
        `> ${emojis.membres} Nombre de membres : ${guild.memberCount}`,
        `> ${emojis.staff} Nombre de rôles : ${guild.roles.cache.size}`,
        `> ${emojis.channel} Nombre de salons : ${guild.channels.cache.size}`,
        `> ${emojis.regions} Région du serveur : ${guild.region}`,
        `> ${emojis.couronne} Créateur du serveur : <@${guild.ownerID}>`,
        `> ${emojis.id} Identifiant du serveur : ${guild.id}`,
        `> ${emojis.settings} Date de création : ${moment(guild.createdAt).format('DD/MM/YYYY')}`
    ])
    .setColor("303136")
    salon.send(embed)

};