const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PmCommand extends BaseCommand {
  constructor() {
    super('pm', 'moderation', []);
  }

  

 async  run(client, message, args) {
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You dont have permissions to use this command.")
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");

    await mentionedMember.send(reason).catch(err => console.log(err));
    }
  }
