const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempbanCommand extends BaseCommand {
  constructor() {
    super('tempban', 'moderation', []);
  }

  async run (client, message, args) {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('🚫YOU CANT USE THIS COMMAND🚫')
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('🚫 I DONT HAVE PERMISSION TO USE THIS COMMAND 🚫')

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(2).join(" ");
    let time = args[1];
    const banEmbed = new Discord.MessageEmbed()
    .setTitle(`🚫Fuiste baneado de ${message.guild.name} Este es la invitacion al server, te vas a poder unir cuando termine tu baneada. https://discord.gg/zyDmDZh6AH 🚫`)
    .addField(`razon: ${reason}`, `Duracion: ${time}`)
    .setTimestamp()

    if (!args[0]) return message.channel.send('🚫tenes que mencionar a alguien🚫, remember, __tempban @usuario tiempo razon');
    if (!mentionedMember) return message.channel.send('🚫El miembro no esta en el servidor🚫');
    if (!mentionedMember.bannable) return message.channel.send('🚫 No puedo banear a este miembro 🚫');
    if (!mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("🚫 El miembro que queers banear tiene un rol mas alto que yo 🚫");
    if (!reason) reason = 'No reason given';
    if (!time) return message.channel.send('🚫 Pone un tiempo para el baneo 🚫')

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    mentionedMember.ban({
      reason: reason
    }).catch(err => console.log(err)); message.channel.send(`${mentionedMember} baneado por ${time}`)

  setTimeout(async function () {
     await message.guild.fetchBans().then(async bans => {
       if (bans.size == 0) return message.channel.send('🚫 Este servidor no tiene bans. 🚫')
       let bannedUser = bans.find(b => b.user.id == mentionedMember.id)
       if (!bannedUser) return console.log('Miembro desbaneado')
        await message.guild.members.unban(bannedUser.user, reason).catch(err => console.log(err))
        message.delete();
     })
  }, ms(time));
  }
} 