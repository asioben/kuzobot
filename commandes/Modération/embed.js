module.exports.run = async (client, message, args) => {

    const db = require("quick.db");
    const config = require("../../jsons/config.json");
    const emojis = require("../../jsons/emojis.json");
    const { MessageEmbed } = require ("discord.js");

        let embedBeforeEdit = new MessageEmbed().setDescription('** **') 
        let msgEmbedForEditing = await message.channel.send(embedBeforeEdit)
        const msgwait = await message.channel.send("Veuillez patienter la fin de l'ajout des réactions");
        await Promise.all(['✏️','💬','🕵️','🔻','🔳','🕙','🖼️','🌐','🔵','↩️','📥','✅'].map(r => msgwait.react(r)));
        await msgwait.edit(`:pencil2: Modifier le titre\n:speech_balloon: Modifier la description\n:detective: Modifier l'auteur\n:small_red_triangle_down: Modifier le footer\n:white_square_button: Modifier le thumbnail\n:clock10: Ajouter un timestamp\n:frame_photo: Modifier l'image\n:globe_with_meridians: Modifier l'url\n:blue_circle: Modifier la couleur\n:leftwards_arrow_with_hook: Ajouter un field\n:inbox_tray: Copier un embed existant`)
        
        const filterReaction = (reaction, user) => user.id===message.author.id&&!user.bot;
        const filterMessage = (m) => m.author.id===message.author.id&&!m.author.bot;
        const collectorReaction = await new ReactionCollector(msgwait, filterReaction);
        collectorReaction.on('collect', async reaction => {
            switch(reaction._emoji.name){
                case '✏️':
                    const msgQuestionTitle = await message.channel.send('Quel est votre titre ?');
                    const title = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
                    message.delete();
                    msgQuestionTitle.delete();
                    embedBeforeEdit.setTitle(title);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '💬':
                    const msgQuestionDescription = await message.channel.send('Quel est votre description ?');
                    const description = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
                    message.delete();
                    msgQuestionDescription.delete();
                    embedBeforeEdit.setDescription(description);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '🕵️':
                    const msgQuestionAuteur = await message.channel.send('Quel est votre auteur ?');
                    const auteur = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
                    message.delete();
                    msgQuestionAuteur.delete();
                    embedBeforeEdit.setAuthor(auteur);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '🔻':
                    const msgQuestionFooter = await message.channel.send('Quel est votre Footer ?');
                    const footer = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
                    message.delete();
                    msgQuestionFooter.delete();
                    embedBeforeEdit.setFooter(footer);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '🔳':
                    const msgQuestionThumbnail = await message.channel.send('Quel est votre Thumbnail _(insérez un lien)_?');
                    const thumbnail = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
                    if(!thumbnail.includes('http') || !thumbnail.includes('https')) return message.channel.send('Thumbnail incorrect bg');
                    message.delete();
                    msgQuestionFooter.delete();
                    embedBeforeEdit.setFooter(footer);
                    msgEmbedForEditing.edit(embedBeforeEdit);
        //sale pd de merd
                break;
                case '🕙':
                    embedBeforeEdit.setTimestamp();
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '🖼️':
                    const msgQuestionImage = await message.channel.send('Quel est votre Image ? _(insérez un lien)_');
                    const image = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
                    if(!image.includes('http') || !image.includes('https')) return message.channel.send('**Le lien est invalide**');
                    message.delete();
                    msgQuestionImage.delete();
                    embedBeforeEdit.setImage(image);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '🌐':
                    const msgQuestionURL = await message.channel.send('Quel est votre URL ?');
                    const url = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
                    message.delete();
                    msgQuestionURL.delete();
                    embedBeforeEdit.setURL(url);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '🔵':
                    const msgQuestionColor = await message.channel.send('Quel est votre Couleur ?');
                    const color = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
                    message.delete();
                    msgQuestionColor.delete();
                    embedBeforeEdit.setColor(color);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '↩️':
                    const msgQuestionField = await message.channel.send('Quel est votre titre du field ?');
                    const titlefield = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
                    message.delete();
                    msgQuestionField.delete();
                    const msgQuestionDescField = await message.channel.send('Quel est votre description du field ?');
                    const descfield = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
                    message.delete();
                    msgQuestionDescField.delete();
                    embedBeforeEdit.addField(titlefield, descfield);
                    msgEmbedForEditing.edit(embedBeforeEdit);
                break;
                case '✅':
                    const msgQuestionChannel = await message.channel.send('Merci de mettre l\'id du salon');
                    const channel = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first().content;
                    message.delete();
                    msgQuestionChannel.delete();
                    if(!message.guild.channels.cache.get(channel)) return message.channel.send('Salon invalide');
                    else message.guild.channels.cache.get(channel).send(embedBeforeEdit);
                break;
            }
        })
            
    };
    
    module.exports.help = {
        name: "embed",
        aliases: [],
        category: "admin",
        enabled: true,
        description: "Permet de supprimer des messages rapidement."
    };