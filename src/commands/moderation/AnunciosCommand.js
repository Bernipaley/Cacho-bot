const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js');

module.exports = class AnunciosCommand extends BaseCommand {
  constructor() {
    super('anuncios', 'moderation', ['a']);
  }

  async run(client, message, args) {

    let suggestion = args.join(' ');
    if (!args[0]) return message.channel.send('tenes que poner un anuncios');('819315554891333693');
    const suggestEmbed = new discord.MessageEmbed()
    .setTitle(`Anuncio`)
    .addField(`${suggestion}`, `Anuncio por ${message.author.tag}.`)
    .setColor('RANDOM')
    .setTimestamp();

    message.channel.send(suggestEmbed)
    message.delete();
  }
}