module.exports = ( client, oldMessage, newMessage ) => {
    
  if(oldMessage.author.bot) return;
  if(oldMessage.channel.type === "dm") return;
  
  const db = require("quick.db");
  const config = require("../../jsons/config.json");

  if(db.get("antilink_" + oldMessage.guild.id) !== "on") return;
  if(oldMessage.member.hasPermission("ADMINISTRATOR")) return;

  let insultes = ["https://", "discord.gg", ".com", ".fr", ".be", ".xyz", ".gg"]
  let foundInText = false;
  for(var i in insultes) {
  if(newMessage.content.toLowerCase().includes(insultes[i].toLowerCase())) foundInText = true;
  }

  if(foundInText) return newMessage.delete()

};