const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {
   if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No tenes permiso para usar este comando mi rey.")
   if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send ("No tengo permisos para usar este comando")

   let reason = args.slice(1).join(" ")
   const mentionedMember = message.mentions.members.first();

   const syntaxEmbed = new Discord.MessageEmbed()
   .setAuthor(client.user.tag, client.user.displayAvatarURL())
   .addField('**Error detectado.**', 'Fijate que estes poniendo bien el comando. (`__ban @usuario razon`)')
   .addField('**Si no, Puede ser un problema con el bot**', 'Si estas escribiendo bien el comando, mandale un mensaje a Berni#7500 para resolver el problema')
   .setColor('RANDOM')
   .setTimestamp();
   const unbannableEmbed = new Discord.MessageEmbed()
   .setAuthor(client.user.tag, client.user.displayAvatarURL())
   .setTitle(`No puedo banear a ${mentionedMember}`)
   .setColor('RANDOM')
   .setTimestamp();
  

  if (!reason) reason = ('No se dio razon');
  if (!args[0]) return message.channel.send(syntaxEmbed)
  if (!mentionedMember) return message.channel.send(syntaxEmbed);
  if (!mentionedMember.bannable) return message.channel.send(unbannableEmbed)




  const banEmbed = new Discord.MessageEmbed() 
  .setTitle(`Fuiste baneado de ${message.guild.name}`)
  .setDescription(`Razon: ${reason}`)
  .setFooter(message.author.tag ,message.author.displayAvatarURL())
  .setColor("RANDOM")
  .setTimestamp();


  await mentionedMember.send(banEmbed).catch(err => console.log(err));
  await mentionedMember.ban({
    days: 7,
    reason: reason
  }).catch(err => console.log(err)).then(() => message.channel.send("Usuario banado:" +  mentionedMember.user.tag))
  
  
  }
}