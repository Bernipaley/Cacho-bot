const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js');
const ms = require('ms');

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('tempmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('🛑YOU DONT HAVE PERMISSION TO USE THIS COMMAND🛑');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('🛑I DONT HAVE PERMISSION TO USE THIS COMMAND🛑');

    const muteRole = message.guild.roles.cache.get('729807936741965956');
    const memberRole = message.guild.roles.cache.get('725089790520983672');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let time = args[1];
    let reason = args.slice(2).join(" ");

    const tempmuteEmbed = new discord.MessageEmbed()
      .setTitle(`🛑Fuiste muteado temporalmente en ${message.guild.name}🛑`)
      .addField(`Duracion ${time}`, `Razon: ${reason}`)
      .setColor('RANDOM')
      .setTimestamp();
      

    const tempmutefinishedEmbed = new discord.MessageEmbed()
      .setTitle(`Fuiste desmuteado en  ${message.guild.name}`)
      .setFooter('Cacho bot, creado por Bernardo Paley')
      .setColor('RANDOM');

    if (!args[0]) return message.channel.send('🛑tenes que mencionar a un miembro con una duracion:  \`__tempmute @user time reason\`🛑');
    if (!mentionedMember) return message.channel.send('🛑NO ENCUENTRO AL MIEMBRO🛑');
    if (!mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('🛑You cannot tempmute a member with the same or highest role as you.🛑');
    if (!time) return message.channel.send('🛑Tenes que poner un tiempo🛑');
    if (reason) reason = 'No reason given';

    await mentionedMember.roles.add(muteRole).catch(err => console.log(err));
      await mentionedMember.roles.remove(memberRole).catch(err => console.log(err));
      await mentionedMember.send(tempmuteEmbed).catch(err => console.log(err)); message.channel.send(`${mentionedMember} muteado por ${time}`)
    
    setTimeout(async function () {
      await mentionedMember.roles.remove(muteRole).catch(err => console.log(err));
      await mentionedMember.roles.add(memberRole).catch(err => console.log(err)); message.channel.send(`${mentionedMember.tag} Desmuteado.`)
      await mentionedMember.send(tempmutefinishedEmbed).catch(err => console.log(err));
    }, ms(time));
    



  }
}