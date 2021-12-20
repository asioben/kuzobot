module.exports.run = async (client, message, args) => {
    const Discord = require('discord.js');
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require("discord.js");
    const db = require("quick.db");
    const fs = require("fs");
    const moment = require('moment');
    const { utc } = require('moment');
    const os = require('os')
    const ms = require('ms')

    const filterLevels = {
      DISABLED: 'Off',
      MEMBERS_WITHOUT_ROLES: 'No Role',
      ALL_MEMBERS: 'Everyone'
  };

  const verificationLevels = {
      NONE: 'Aucun',
      LOW: 'Bas',
      MEDIUM: 'Moyen',
      HIGH: '(╯°□°）╯︵ ┻━┻',
      VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
  };

  const regions = {
      brazil: 'Brazil',
      europe: 'Europe',
      hongkong: 'Hong Kong',
      india: 'India',
      japan: 'Japan',
      russia: 'Russia',
      singapore: 'Singapore',
      southafrica: 'South Africa',
      sydeny: 'Sydeny',
      'us-central': 'US Central',
      'us-east': 'US East',
      'us-west': 'US West',
      'us-south': 'US South'
  };

  const flags = {
      DISCORD_EMPLOYEE: 'Discord Employee',
      DISCORD_PARTNER: 'Discord Partner',
      BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
      BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
      HYPESQUAD_EVENTS: 'HypeSquad Events',
      HOUSE_BRAVERY: 'House of Bravery',
      HOUSE_BRILLIANCE: 'House of Brilliance',
      HOUSE_BALANCE: 'House of Balance',
      EARLY_SUPPORTER: 'Early Supporter',
      TEAM_USER: 'Team User',
      SYSTEM: 'System',
      VERIFIED_BOT: 'Verified Bot',
      VERIFIED_DEVELOPER: 'Verified Bot Developer'
  };
  const rolesGuild = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
  const membersGuild = message.guild.members.cache;
  const channelsGuild = message.guild.channels.cache;
  const emojisGuild = message.guild.emojis.cache;
  const argument = args[0];
  const member = message.mentions.members.first() || message.guild.members.cache.get() || message.member;
  if(member.user.presence.status == "offline"){
      var online = "online"
  }else{
      online = "offline"
  }
  const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString())
      .slice(0, -1);
  const userFlags = member.user.flags.toArray();
  const embedUser = new Discord.MessageEmbed()
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .addField('Personne', [
          `${emojis.backup} **Nom:** ${member.user.username}`,
          `${emojis.channel} **Discriminatoir:** ${member.user.discriminator}`,
          `${emojis.id} **ID:** ${member.id}`,
          `🏳️ **Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Aucun'}`,
          `${emojis.note} **Avatar:** [Lien de l'avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
          `${emojis.owner} **Création du compte:** ${moment(member.user.createdTimestamp).format('[Le] DD/MM/YYYY [à] HH:MM:SS')} ${moment(member.user.createdTimestamp).fromNow()}`,
          `${emojis.backup} **Status:** ${member.user.presence.status}`,
          `🎮 **Activité :** ${member.user.presence.activities}`,

          `\u200b`
      ])
    
      .addField('Membre', [
          `${emojis.protect} **Role le plus haut:** ${member.roles.highest.id === message.guild.id ? 'Aucun' : member.roles.highest.name}`,
          `${emojis.regions} **Rejoint le serveur:** ${moment(member.joinedAt).format('[Le] DD/MM/YYYY [à] HH:MM:SS')}`,
          `${emojis.staff} **Plus haut rôle:** ${member.roles.hoist ? member.roles.hoist.name : 'Aucun'}`,
          `${emojis.invite} **Rôles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'Aucun'}`,
          `\u200b`
      ])
      .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
      .setTimestamp()
      .setColor("303136")
  
  return message.channel.send(embedUser);

}

module.exports.help = {
    name: "userinfo",
    aliases: ["useri", "ui"],
    category: "utils",
    enabled: true,
    description: "Affiche les différents liens du bot."
};