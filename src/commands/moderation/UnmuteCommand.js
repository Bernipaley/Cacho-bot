const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('🛑YOU DONT HAVE PERMISSION TO USE THIS COMMAND🛑');
    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send('🛑YOU DONT HAVE PERMISSION TO USE THIS COMMAND🛑');
    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('729807936741965956');
    const memberRole = message.guild.roles.cache.get('725089790520983672');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`Fuiste desmuteado en ${message.guild.name}`)
      .setDescription(`Razon: ${reason}`)
      .setColor('RANDOM')
      .setTimestamp()
      .setFooter("Cacho Bot, Creado por Bernardo Paley")
    


    if (!args[0]) return message.channel.send('🛑\`__unmute @user reason\`🛑 ');
    if (!mentionedMember) return message.channel.send('🛑 No encuentro al miembro 🛑');
    if (!mentionedMember.user.id == message.author.id) return message.channel.send('🛑 No te podes desmutear a vos 🛑')
    if (!mentionedMember.user.id == client.user.id) return message.channel.send('🛑 No me podes mutear con mi mismo comando 🛑');
    if (!reason) reason = 'No reason given';
    if (mentionedMember.roles.cache.has(memberRole)) return message.channel.send('🛑 Este miembro ya esta muteado 🛑');
    if (message.member.roles.highest.postition <= mentionedMember.roles.highest.postition) return message.channel.send('🛑No podes mutear a alguien con tu mismo rol o mas alto que vos. 🛑')


    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(memberRole).catch(err => console.log(err).then(message.channel.send('🛑There was an issue while tring to add the member role to the member🛑')));
    await mentionedMember.roles.remove(muteRole).catch(err => console.log(err).then(message.channel.send('🛑There was an issue while trying to remove the muted roles to the user🛑')));
    message.channel.send(mentionedMember +  "Desmuteado")



  }
} 
  
