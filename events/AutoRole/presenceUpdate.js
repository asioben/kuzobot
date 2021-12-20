const fs = require("fs");

module.exports = async (client, oldPresence, newPresence) => {
fs.readFile(`./serveur/${newPresence.guild.id}.json`, async (err, data) => {
if (err) return;
    if(!oldPresence) return;
    let db = JSON.parse(fs.readFileSync(`./serveur/${oldPresence.guild.id}.json`, "utf8"));
    if(!db) return;
    if(db.statut.module === false) return;
    role = db.fetch("soutien_role_" + member.guild.id)
    statut = db.fetch("soutien_statut_" + member.guild.id)

if(newPresence.activities[0] && newPresence.activities[0].state === statut) {
if(!newPresence.member.roles.cache.some(r => r.id === role)) {
    newPresence.member.roles.add(role)
}
} else {
if(newPresence.member.roles.cache.some(r => r.id === role)) {
        newPresence.member.roles.remove(role)
}  
}
});
};