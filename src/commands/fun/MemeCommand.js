const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = class MemeCommand extends BaseCommand {
  constructor() {
    super('meme', 'fun', []);
  }

  async run(client, message, args) {
    fetch('https://meme-api.herokuapp.com/gimme')
    .then(res => res.json())
    .then(async json => { 
      const memeEmbed = new Discord.MessageEmbed()
      .setTitle('Meme')
      .setImage(json.url)
      .setFooter('Cacho Bot, creado por Bernardo Paley');

      let msg = await message.channel.send('Buscando un meme...')
      msg.edit(memeEmbed);

      
    });
  }
}