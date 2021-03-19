const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  

 async  run(client, message, args) {
   if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You dont have permissions to kick members")
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given"
    const kickEmbed = new Discord.MessageEmbed()
    .setTitle(`Te kickearon en ${message.guild.name} `)
    .setDescription(`Razon: ${reason}`)
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter("Cacho bot, Creado por Bernardo Paley")
    const syntaxEmbed = new Discord.MessageEmbed()
   .setAuthor(client.user.tag, client.user.displayAvatarURL())
   .addField('**Error detectado.**', 'Fijate que estes poniendo bien el comando. (`__kick @usuario razon`)')
   .addField('**Si no, Puede ser un problema con el bot**', 'Si estas escribiendo bien el comando, mandale un mensaje a Berni#7500 para resolver el problema')
   .setColor('RANDOM')
   const unkickableEmbed = new Discord.MessageEmbed()
   .setAuthor(client.user.tag, client.user.displayAvatarURL())
   .setTitle(`No puedo kickear a ${mentionedMember}`)
   .setColor('RANDOM')
   .setTimestamp();
    // ¿kick @user reason
    if (!args[0]) return message.channel.send(syntaxEmbed);
    if (!mentionedMember) return message.channel.send(syntaxEmbed);
    if (!mentionedMember.kickable) return message.channel.send(unkickableEmbed);
    try {
      await mentionedMember.send(kickEmbed);
    } catch (err) {
      console.log('i was unable to message the member');
    }

    try {
      await mentionedMember.kick(reason), message.channel.send(`Usuario expulsado: ${mentionedMember}`)
    } catch (err) {
      console.log(err)
      return message.channel.send("i was unable to kick the user")
    }
  }
}