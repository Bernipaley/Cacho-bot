const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
   if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You dont have permision to unban members ._. ")
   if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send ("I dont have permissions to unban members")

   let reason = args.slice(1).join(" ")
   let userID = args[0];

  if (!reason) reason = ('No reason given');
  if (!args[0]) return message.channel.send("Tenes que poner el id a desbanear. (recorda: __unban ID reason)")
  if (isNaN(args[0])) return message.channel.send("El id no es un numero")

  message.guild.fetchBans().then(async bans => {
    if (bans.size == 0) return message.channel.send(' El servidor no tiene baneos.');
    let bUser = bans.find(b => b.user.id == userID);
    if (!bUser) return message.channel.send('Ese ID no esta baneado');
    await message.guild.members.unban(bUser.user, reason).catch(err => {
      console.log(err);
      return message.channel.send('Something went wrong trying to unban the ID stated');
    }).then(() => {
      message.channel.send(`ID desbaneado: ${userID} \n\ razon: ${reason}`);
    })
  })

  }
}