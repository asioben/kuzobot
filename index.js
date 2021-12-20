const Discord = require("discord.js");
const db = require("quick.db");

const fs = require("fs");
const { Collection } = require('discord.js');
const client = new Discord.Client({ fetchAllMembers: true });
require('discord-reply'); //:warning: IMPORTANT: put this before your discord.Client()
const { RichEmbed }     = require("discord.js");

const config = require("./jsons/config.json");
const emojis = require("./jsons/emojis.json");
const yaml = require("js-yaml")

///////////////////////////////////////////////// 

client.commands = new Discord.Collection
client.aliases = new Discord.Collection
client.cooldowns = new Discord.Collection

/////////////////////////////////////////////////  

const loadCommands = (dir = "./commandes/") => {
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"))
        for (const file of commands) {
        const getFileName = require(`${dir}/${dirs}/${file}`)
        client.commands.set(getFileName.help.name, getFileName)
        getFileName.help.aliases.forEach(alias => {
        client.aliases.set(alias, getFileName.help.name)
    })
  console.log(`➜ Commande chargée : ${getFileName.help.name}`)
  console.log(`-------------------------------------------------`)
  }
})}

loadCommands()


const loadEvents = (dir = "./events/") => {
    fs.readdirSync(dir).forEach(dirs => {
      const events = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
  
      for (const event of events) {
        const evt = require(`${dir}/${dirs}/${event}`);
        const evtName = event.split(".")[0];
        client.on(evtName, evt.bind(null, client));
        console.log(`➜ Event chargé : ${evtName}`);
        console.log(`-------------------------------------------------`)
      };
    });
}

loadEvents();
     //==============================         INVITATIONS    ==========================================
     const guildInvites = new Map();

client.on("inviteCreate", async invite =>
  guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
);
client.on("ready", () => {
  client.guilds.cache.forEach(guild => {
    guild
      .fetchInvites()
      .then(invites => guildInvites.set(guild.id, invites))
      .catch(err => console.log(err));
  });
});
const { defaultjoinmessage, defaultleavemessage } = yaml.load(
  fs.readFileSync("./config.yml")
);
client.on("guildMemberAdd", async member => {
  let joinchannelmessage = db.get(`joinchannelmessage_${member.guild.id}`);
  if (!joinchannelmessage === null) {
    return console.log(`Aucun JoinChannelMessage`);
  }
  let joinmessage = db.get(`joinchannelmessage_${member.guild.id}`);
  if (joinmessage === null) joinmessage = defaultjoinmessage;

  const catchedInvites = guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  guildInvites.set(member.guild.id, newInvites);
  try {
    const usedInvite = newInvites.find(
      inv => catchedInvites.get(inv.code).uses < inv.uses
    );
    db.add(`invites_${member.guild.id}_${usedInvite.inviter.id}`, 1);
    db.set(`inviter_${member.id}`, usedInvite.inviter.id);
    let inv = db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}`);
    //let jointimes = db.get(`jointimes_${member.guild.id}_${member.author.id}`)
    //if(jointimes === null) jointimes = "First Time";
    let joinmessage2 = defaultjoinmessage
      .toLowerCase()
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv);

    //  .replace("{jointimes}", jointimes)
    //  .replace("{jointimes}", jointimes)
    // .replace("{jointimes}", jointimes)
    //  .replace("{jointimes}", jointimes)

    db.add(`jointimes_${member.guild.id}_${member.id}`, 1);
    db.add(`Regular_${member.guild.id}_${usedInvite.inviter.id}`, 1);

    client.channels.cache.get(joinchannelmessage).send(joinmessage2);
  } catch (err) {
    console.log(err);
  }
})

client.on("guildMemberRemove", member => {
  let leavechannel = db.get(`leavechannelmessage_${member.guild.id}`);
  if (leavechannel === null) {
    return console.log(`nope!`);
  }
  let leavemssage = db.get(`leavemessage_${member.guild.id}`);
  if (leavemssage === null) leavemssage = defaultleavemessage;

  let inviter2 = db.fetch(`inviter_${member.id}`);
  const iv2 = client.users.cache.get(inviter2);
  const mi = member.guild.members.cache.get(inviter2);
  db.subtract(`invites_${member.guild.id}_${inviter2}`, 1);

  if (!inviter2) {
    client.channels.cache
      .get(leavechannel)
      .send(`**${member}** L'utilisateur est parti mais je n'ai pas pu **trouver** qui l'a invité!`);
    
    return;
  }
  let leavemssage2 = leavemssage
    .toLowerCase()
    .replace("{user}", member.user.tag)
    .replace("{user}", member.user.tag)
    .replace("{user}", member.user.tag)
    .replace("{user}", member.user.tag)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`);

  db.add(`leaves_${member.guild.id}_${inviter2}`, 1);
  client.channels.cache.get(leavechannel).send(leavemssage2)
});


client.on("message", message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    const prefix = require("quick.db").get(`prefix_${message.guild.id}`) || config.prefix;
    if (!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).split(' ')
    let cmd = args.shift()
    let commands
    if (client.commands.has(cmd)) {
  
        commands = client.commands.get(cmd)
  
    }else if (client.commands.has(client.aliases.get(cmd))) {
  
        commands = client.commands.get(client.aliases.get(cmd))
  
    }else{ 
        return 
    }
    
    let a = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
  
    if(a.help.enabled === false) return;
  
    commands.run(client, message, args)
  
  })
  
  ///////////////////////////////////////////////// 
  
  client.login(config.token)