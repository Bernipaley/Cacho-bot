const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class modcommandsCommand extends BaseCommand {
  constructor() {
    super('modcommands', 'various', []);
  }

  run(client, message, args) {
    const modEmbed = new Discord.MessageEmbed()
    .setTitle("Moderation commands")
    .addField('N-1','__ban')
    .addField('how to use it?','Simple! \`__ban @user reason (//why you do want to ban this member//)\` the member will receive a DM with the info of his/her ban')
    .addField('N-2','__tempban')
    .addField('how to use it?','Simple! \` __tempban @user because he didnt behave with the server 30m\` //the member will receive a DM with the info of his/her tempban')
    .addField('N-3','__kick')
    .addField('how to use it?',' \`__kick @user reason (//why you do want to kick this member//)\`the member will receive a DM with the info of his/her kick')
    .addField('N-4','__lock')
    .addField('how to use it?',' \`__lock\` (you have to put that, in the channel you want to lock. For exaple i go to <#814887573742551111> and i put ¿lock when you send that nobody will be able to write at that channel')
    .addField('N-5','__unlock')
    .addField('how to use it?',' \`__unlock\` (you have to put that, in the channel you want to unlock. For exaple i go to <#814887573742551111> and i put o!unlock when you send that everyone will be able to write at that channel')
    .addField('N-6','__nickname')
    .addField('how to use it?',' \`__nickname @user new nickname\` If someone have an offensive nickname, you must change it to another one')
    .addField('N-7','__purge')
    .addField('how to use it?',' \`__purge 1-100 (messages do you want to delete)\` If someone spam, you must use this command and use tempmute it for 1hs as the rules say')
    .addField('N-8','__tempmute')
    .addField('how to use it?','Simple! \` __tempmute @user because he didnt behave with the server 30m\` //the member will receive a DM with the info of his/her tempmute, and another one when his/her tempmute finish')
    .addField('N-9','__mute')
    .addField('how to use it?','Simple! \` __mute @user reason\` //the member will receive a DM with the info of his/her mute.')
    .addField('N-10','__unmute')
    .addField('how to use it?','Simple! \` __unmute @user reason\` //the member will receive a DM with the info of his/her unmute.')
    .addField('N-11', '__nuke')
    .addField('How to use it?', 'Simple! \n\ __nuke (This on the channel that u want to nuke) This command is for delete a channel and create the same channel with the same permissions. ')
    .addField('N-12', '__warn')
    .addField('How to use it?', 'Simple! __warn @user add razon (To add a warn), __warn @user remove razon (To remove a warn), __warn @user (To check the user warns)')

    .setTimestamp();
    message.delete()
    message.channel.send(modEmbed);
  }
}