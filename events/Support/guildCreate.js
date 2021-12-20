const { MessageEmbed } = require("discord.js")

module.exports = ( client, guild ) => {
    
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json")
    const moment = require("moment")

    const salon = client.channels.cache.get("881555436195700736");

    let embed = new MessageEmbed()
    .setTitle("<a:fleche:880960098787278858> Nouveau serveur !")
    .setDescription(`> __Information sur ${client.user.username}__\nNombre de serveurs où ce trouve le bot : **${client.guilds.cache.size}**\nNombre de membres totaux : **${guild.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}**\n\n${emojis.banniere} ・ Nom du Serveur : **${guild.name}**\n${emojis.id} ・ ID du Serveur : **${guild.id}**\n${emojis.couronne} ・ Créateur du Serveur : <@${guild.ownerID}> (**${guild.owner.user.tag}**)\n${emojis.settings} ・ Date de création : **${moment(guild.createdAt).format('DD/MM/YYYY')}**\n${emojis.regions} ・ Région du Serveur : **${guild.region}**\n\n> __Informations supplémentaires :__\n${emojis.membres}  ・ Nombre de Membres : **${guild.memberCount}**\n${emojis.staff}  ・ Nombre de Rôles : **${guild.roles.cache.size}**\n${emojis.channel} ・ Nombre de Salons : **${guild.channels.cache.size}**\n`)
    .setColor("00FF00")
    .setColor("303136")
    salon.send(embed)

};