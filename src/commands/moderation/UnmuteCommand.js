const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('πYOU DONT HAVE PERMISSION TO USE THIS COMMANDπ');
    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send('πYOU DONT HAVE PERMISSION TO USE THIS COMMANDπ');
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
    


    if (!args[0]) return message.channel.send('π\`__unmute @user reason\`π ');
    if (!mentionedMember) return message.channel.send('π No encuentro al miembro π');
    if (!mentionedMember.user.id == message.author.id) return message.channel.send('π No te podes desmutear a vos π')
    if (!mentionedMember.user.id == client.user.id) return message.channel.send('π No me podes mutear con mi mismo comando π');
    if (!reason) reason = 'No reason given';
    if (mentionedMember.roles.cache.has(memberRole)) return message.channel.send('π Este miembro ya esta muteado π');
    if (message.member.roles.highest.postition <= mentionedMember.roles.highest.postition) return message.channel.send('πNo podes mutear a alguien con tu mismo rol o mas alto que vos. π')


    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(memberRole).catch(err => console.log(err).then(message.channel.send('πThere was an issue while tring to add the member role to the memberπ')));
    await mentionedMember.roles.remove(muteRole).catch(err => console.log(err).then(message.channel.send('πThere was an issue while trying to remove the muted roles to the userπ')));
    message.channel.send(mentionedMember +  "Desmuteado")



  }
} 
  
