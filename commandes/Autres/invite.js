module.exports.run = async (client, message, args) => {

  const config = require("../../jsons/config.json");
  const emojis = require("../../jsons/emojis.json");
  const discord = require('discord.js');
  const disbut = require('discord-buttons');
  

  let myembed = new discord.MessageEmbed()
  .setTitle("<a:fleche:880960098787278858> Invitation")
  .setDescription(`:link: ・ Lien d'invitation **[Administrateur]** : \`🔗\` (recommandé)\n:paperclips: ・ Lien d'invitation **[Sans permission]** : \`🖇️\`\n\n🔧 ・ Support : \`🔧\` `)
  .setTimestamp() 
  .setFooter(client.user.username, client.user.displayAvatarURL())
  .setColor("303136")

  let btn = new disbut.MessageButton()
  .setStyle('url') 
  .setLabel('🔗') 
  .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)

let btn2 = new disbut.MessageButton()
  .setStyle('url')
  .setLabel('🖇️')
  .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=0`)

  let button2 = new disbut.MessageButton()
  .setStyle('url') 
  .setLabel('🔧') 
  .setURL(config.support) 

  message.channel.send(myembed, {
  buttons: [btn, btn2, button2]
})
}

module.exports.help = {
  name: "invite",
  aliases: ["addbot", "link", "liens", "support"],
  category: "utils",
  enabled: true,
  description: "Affiche les différents liens du bot."
};