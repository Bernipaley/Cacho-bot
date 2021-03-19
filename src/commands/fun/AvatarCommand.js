const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js')

module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super('avatar', 'fun', []);
  }

  run(client, message, args) {

    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mentionedMember) mentionedMember = message.member;
    
    const avatarEmbed = new discord.MessageEmbed()
    .setTitle(mentionedMember.user.tag +   "Avatar")
    .setImage(mentionedMember.user.displayAvatarURL())
    .setFooter('Cacho Bot, Creado por Bernardo Paley')
    .setTimestamp();

    message.channel.send(avatarEmbed);
    
  }
}