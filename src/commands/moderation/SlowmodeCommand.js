const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SlowmodeCommand extends BaseCommand {
  constructor() {
    super('slowmode', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You dont have permissions tu use this');
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You dont have permissions tu use this');
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('🛑I DONT HAVE PERMISSION TO USE THIS COMMAND🛑');

    const value = Number(args[0]);
    

    if(!args[0]) return message.channel.send('tenes que poner un tiempo para el slowmode');
    if(!value || value < 5 || value > 21600) return message.channel.send('tenes que poner un numero entre `5-21600` Estos son los segundos del slowmode.');

    try {
      await message.channel.setRateLimitPerUser(value)
      message.channel.send(`Slowmode para ${message.channel} seteado a ${value} segundos.`)

    } catch (err) {
      console.log(err)
      message.channel.send('An error ocurred');

    }

  }
}