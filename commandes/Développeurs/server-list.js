module.exports.run = async (client, message, args) => {

    const ids = ["758561030644170752"]
    if(!ids.includes(message.author.id)) return;
    const db = require("quick.db");

    let author = message.mentions.members.first();
    let member = message.mentions.members.first();

        let staffc = await db.fetch(`owner__${message.author.id}`)
        if(staffc === 0 || staffc === null) return message.channel.send(`**:x: Vous n'êtes pas owner.**`)

        client.guilds.cache.map((guild) => {

            let embeda = new MessageEmbed()
            .setTitle(`Liste des serveurs`)
          
            let embed = new MessageEmbed()
            .setDescription(`**${guild.name}**\nID: ${guild.id}`)
              message.channel.send(embed)
            })
          
          

};

module.exports.help = {
    name: "serverlist",
    aliases: ["slt"],
    category: "dev",
    enabled: true,
    description: "Permet de unwhitelist un membre."
};