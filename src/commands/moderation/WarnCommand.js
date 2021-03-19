const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js')

module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super('warn', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You dont have enough permissions tu use this command'); 
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You dont have enough permissions tu use this command');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('i dont have enough permissions tu use this command');


    const warnrole1 = message.guild.roles.cache.find(role => role.name == 'Warnings : [1]');
    const warnrole2 = message.guild.roles.cache.find(role => role.name == 'Warnings : [2]');
    const warnrole3 = message.guild.roles.cache.find(role => role.name == 'Warnings : [3]');
    const muteRole = message.guild.roles.cache.get('729807936741965956');
    const memberRole = message.guild.roles.cache.get('725089790520983672')
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let punishment = 1;
    let reason = args.slice(2).join(" ");

    if (!warnrole1) await message.guild.roles.create({
      data: {
        name: 'Warnings : [1]',
        color: 'GREY'
      }
    }).catch(err => console.log(err));

    if (!warnrole2) await message.guild.roles.create({
      data: {
        name: 'Warnings : [2]',
        color: 'GREY'
      }
    }).catch(err => console.log(err));

    if (!warnrole3) await message.guild.roles.create({
      data: {
        name: 'Warnings : [3]',
        color: 'GREY'
      }
    }).catch(err => console.log(err));

    if (!args[0]) return message.channel.send('tenes que mencionar a un miebro, si solo queres checkear , agregar o sacar warn')
    if (!mentionedMember) return message.channel.send('tenes que mencionar a alguien.');
    if (!reason) reason = 'No reason provided'

    if (mentionedMember.roles.cache.has(warnrole1.id)) punishment = 2;
    if (mentionedMember.roles.cache.has(warnrole2.id)) punishment = 3;
    if (mentionedMember.roles.cache.has(warnrole3.id)) punishment = 4;

    if (!['add', 'remove'].includes(args[1])) {
      if (punishment == 1) {
        return message.channel.send(`${mentionedMember.user.tag} No tiene warnings.`);
      } else if (punishment == 2) {
        return message.channel.send(`${mentionedMember.user.tag} Tiene 1 warns.`);

      } else if (punishment == 3) {
        return message.channel.send(`${mentionedMember.user.tag} Tiene 2 warns.`);

      } else if (punishment == 4) {
        return message.channel.send(`${mentionedMember.user.tag} Tiene 3 warns.`);

      }

    } else {
      if (args[1] == 'add') {
        if (punishment == 1) {
          await mentionedMember.roles.add(warnrole1.id).catch(err => console.log(err))
          return message.channel.send(`${mentionedMember}, Fuiste warneado por ${reason}`)

        } else if (punishment == 2) {
          await mentionedMember.roles.add(warnrole2.id).catch(err => console.log(err))
          await mentionedMember.roles.remove(warnrole1.id).catch(err => console.log(err))
          return message.channel.send(`${mentionedMember}, Fuiste warneado por ${reason}`)
      
        } else if (punishment == 3) {
          await mentionedMember.roles.add(warnrole3.id).catch(err => console.log(err))
          await mentionedMember.roles.remove(warnrole2.id).catch(err => console.log(err))
          return message.channel.send(`${mentionedMember}, Fuiste warneado por ${reason}`)
       
        } else if (punishment == 4) {
          await mentionedMember.roles.add(muteRole).catch(err => console.log(err))
          await mentionedMember.roles.remove(warnrole3)
	  await mentionedMember.roles.add(muteRole.id)
	  await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err))
          message.channel.send(`${mentionedMember} Muteado porque alcanzo el limite de warns (4), para desmutear: __unmute @usuario razon`)
          
  
        }

      } else if (args[1] == 'remove') {
        if (punishment == 1) {
          return message.channel.send(`${mentionedMember.user.tag}, Dont have warnings.`)

        } else if (punishment == 2) {
          await mentionedMember.roles.remove(warnrole1.id).catch(err => console.log(err))
          return message.channel.send(`I have remove warnings from ${mentionedMember.user.tag}`)
      
        } else if (punishment == 3) {
          await mentionedMember.roles.remove(warnrole2.id).catch(err => console.log(err))
          return message.channel.send(`I have remove warnings from ${mentionedMember.user.tag}`)
       
        } else if (punishment == 4) {
          
        }
      }
    }
  }
}