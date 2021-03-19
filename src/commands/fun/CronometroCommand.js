const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js');
const ms = require('ms');

module.exports = class CronometroCommand extends BaseCommand {
  constructor() {
    super('cronometro', 'fun', []);
  }

  async run(client, message, args) {

    let time = args[0];
   

    const cronometroonEmbed = new discord.MessageEmbed()
      .setTitle(`Cronometro empezado`)
      .setDescription(`Duracion ${time}`)
      .setColor('RANDOM')
      .setTimestamp();
      

    const cronometrooffEmbed = new discord.MessageEmbed()
      .setTitle(`⏲️⏲️ Cronometro finalizado ⏲️⏲️`)
      .setColor('RANDOM');

    if (!time) return message.channel.send('🛑 Tenes que poner de cuanto tiempo va a ser el cronometro 🛑'); message.channel.send(cronometroonEmbed)
    
    setTimeout(async function () {
      message.channel.send(cronometrooffEmbed)
    }, ms(time));
    
  }
}