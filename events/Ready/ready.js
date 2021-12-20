module.exports = ( client ) => {
    const channel = client.channels.fetch("881555397654228993")
    const config = require("../../jsons/config.json");
    const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/881901630025531394/NFaMB1g03OL-Ca-gZGnpA8A8q2If5LRqToHG71b8iubJa5Zgx3_7A1dCkPi5KiPI4UNx");
 
        hook.send("<a:queue:864868562233196614> Le bot est désormais **connecter**.");
    
    console.log(`➜ Connecté en tant que ${client.user.tag}`);
  if (client.channels.cache.has("881555397654228993")) client.channels.cache.get("881555397654228993").join().catch();

    setInterval(changing_status, 5000);
    
    function changing_status() {
        let status = [`${client.guilds.cache.size} serveurs`]
        let random = status[Math.floor(Math.random() * status.length)]
        client.user.setActivity(random)
    };

};