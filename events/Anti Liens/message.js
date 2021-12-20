module.exports = ( client, message ) => {
    
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  const db = require("quick.db");
  const config = require("../../jsons/config.json");

  if(db.get("antilink_" + message.guild.id) !== "on") return;
  if(message.member.hasPermission("ADMINISTRATOR")) return;

  let insultes = ["https://", "discord.gg", ".com", ".fr", ".be", ".xyz", ".gg"]
  let foundInText = false;
  for(var i in insultes) {
  if(message.content.toLowerCase().includes(insultes[i].toLowerCase())) foundInText = true;
  }

  if(foundInText) return message.delete()

};