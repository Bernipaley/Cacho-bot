const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js');
const recon = require('reconlx'); 
const ReactionPages = recon.ReactionPages;

module.exports = class ComandosCommand extends BaseCommand {
  constructor() {
    super('comandos', 'fun', []);
  }

  async run(client, message, args) {
    const embed1 = new discord.MessageEmbed()
    .setTitle('Comandos')
    .addField('__avatar', 'Con este comando, podes ver tu avatar')
    .addField('__cronometro', 'Con este comando podes poner un cronometro. Se usa: `o!cronometro (tiempo)`')
    .setColor('RANDOM')
    .setFooter('Cacho Bot, Creado por Bernardo Paley')
    const embed2 = new discord.MessageEmbed()
    .setTitle('Comandos')
    .addField('__meme', 'Con este comando, el bot te da un meme')
    .addField('__say', 'Con este comando, el bot va a mandar un mensaje diciendo lo que quieras.')
    .addField('__suggest', 'Con este comando, podes mandar sugerencias en el servidor (<#774796138872176641>) Se usa asi: `__suggest (la sugerencia)`')
    .setColor('RANDOM')
    .setFooter('Cacho Bot, Creado por Bernardo Paley ');
    const embed3 = new discord.MessageEmbed()
    .setTitle('Comandos')
    .addField('__snipe', 'con este comando podes ver el ultimo mensaje eliminado del servidor.')
    .addField('Hay mas comandos, ', 'pero son de moderacion')
    .setColor('RANDOM')
    .setFooter('Cacho bot, Creado por Bernardo Paley')
    const pages = [embed1, embed2, embed3];
    const emojis = ['⬅️', '➡️'];

    ReactionPages(message, pages, true, emojis);
  }
}