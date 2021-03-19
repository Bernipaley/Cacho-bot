const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NicknameCommand extends BaseCommand {
  constructor() {
    super('nickname', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(" 🛑 You cant use this 🛑");
    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(" 🛑 i dont have permissions 🛑");
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nickName = args.slice(1).join (" ");


    if (!args[0]) return message.channel.send("🛑 tenes que poner a quien le queres cambiar el nickname 🛑");
    if (!mentionedMember) return message.channel.send("🛑 Ese miembro no esta en el server. 🛑");
    if (!nickName) return message.channel.send("🛑 tenes que poner que nickname queres que tenga 🛑")
    if (!mentionedMember.kickable) return message.channel.send("🛑 No le puedo cambiar el nickname. 🛑");

    await mentionedMember.setNickname(nickName).catch(err => console.log(err) && message.channel.send("🛑 No le puedo poner ese nickname 🛑"))
    
    message.channel.send(`Nickname of ${mentionedMember} to ${nickName}`)
    console.log(`Nickname of ${mentionedMember} Cambiado a: ${nickName}`)
  


}}    
  