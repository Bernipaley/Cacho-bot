const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'moderation', []);
  }

  
  async run(client, message, args) {
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You dont have permissions to delete messages')
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("i dont have permissions to delete messages")
    if (!args[0]) return message.channel.send("You must put a number to use this command! (1-100)")
    const amonutToDelete = Number(args[0], 10);
    

    if (isNaN(amonutToDelete)) return message.channel.send("Numero invalido")
    if (!Number.isInteger(amonutToDelete)) return message.channel.send("Number must be a whole number");
    if(!amonutToDelete  || amonutToDelete < 1 || amonutToDelete > 100) return message.channel.send('El numero tiene que estar entre `1-100`')
    const fetched = await message.channel.messages.fetch({
      limit: amonutToDelete
    });

    try {
      await message.channel.bulkDelete(fetched)
      .then(messages => message.channel.send(`Elimine: ${messages.size} mensajes`))
      
      
    } catch (err) {
      console.log(err);
      message.channel.send(`No puedo eliminar los mensajes, estate seguro que no tienen mas de 14 dias de antiguedad`);
      
      

    }
  }
}