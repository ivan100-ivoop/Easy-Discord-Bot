const { Events } = require('discord.js');

module.exports = {
    run: async (client) => {
        const logger = client.framework.getLogger();
        const errors = client.framework.getErrors();
        const { ant_tag } = client.framework.getConfig();


        client.on(Events.MessageCreate, async message => {
            let reply = errors.no_tag;

            if (message.author.bot) return;
            if (!message.guild) return;
            if(!ant_tag.enabled) return;

            if(ant_tag.users.includes(message.author.id)) return;
            if(message.member.roles.cache.find(r => ant_tag.roles.includes(r.id))) return;


            if(ant_tag.auto_protect_owner){
                if (message.mentions.users.has(client.framework.getOwner(message.guild.id))){
                    message.delete();
                    reply = reply.replace("{name}", `<@${message.author.id}>`);
                    logger.warning(`User ${message.author.username} try to tag protected persone!`);
                    
                    return message.channel.send(reply)
                }    
            }

            for(const member of ant_tag.users){
                if (message.mentions.users.has(member)){
                    message.delete();
                    reply = reply.replace("{name}", `<@${message.author.id}>`);
                    logger.warning(`User ${message.author.username} try to tag protected persone!`);
                    
                    return message.channel.send(reply)
                }    
            }

            for(const role of ant_tag.roles){

                if (message.mentions.roles.has(role)){
                    message.delete();
                    reply = reply.replace("{name}", `<@${message.author.id}>`);
                    logger.warning(`User ${message.author.username} try to tag protected role!`);
                    
                    return message.channel.send(reply)
                }
            }

        });
    }
}