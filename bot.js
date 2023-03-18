const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});

const allowedRoles = ['1084425338802684034', '1084425338802684034']; // IDs der Rollen, die Links posten dürfen
const logChannelId = '1084424951085408260'; // ID des Kanals, in den gelöschte Links geloggt werden sollen

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.author.bot || message.member.roles.cache.some(r => allowedRoles.includes(r.id))) {
    return;
  }

  if (message.content.match(/(http(s)?:\/\/[^\s]+)/gi)) {
    message.delete()
      .then(() => {
        message.channel.send(`${message.author} Links sind in diesem Kanal nicht erlaubt!`)
          .then(msg => {
          })
          .catch(console.error);
        const logChannel = client.channels.cache.get(logChannelId);
        if (logChannel) {
          logChannel.send(`Link gelöscht in ${message.channel} von ${message.author.tag} **LINK**: ${message.content}`);
        }
      })
      .catch(console.error);
  }
});

client.login('');