const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class CalcCommand extends BaseCommand {
  constructor() {
    super('calc', 'tool', ['calculator']);
  }

  run(client, message, args) {
    //o!calc number sign number 
    const firstValue = Number(args[0]);
    const secondValue = Number(args[2]);

    if (!args[0]) return message.channel.send(`tenes que poner mas numeros para el comando. ${client.prefix}calc numero [+, -, x, /]  numero`)
    if(!firstValue) return message.channel.send('No hay un primer numero.')
    if (!args[1]) return message.channel.send('tenes que poner que queres hacer con estos numeros.')
    if (!['+', '-', 'x', '/'].includes(args[1])) return message.channel.send('No pusiste que queres hacer con los numeros. (+ - x /)')
    if (!secondValue) return message.channel.send('No hay un segundo numero')

    if (args[1] == '+') {
     let result = firstValue + secondValue
     message.channel.send(`${firstValue} + ${secondValue} = ${result}`)
    }

    if (args[1] == '-') {
      let result = firstValue - secondValue
      message.channel.send(`${firstValue} - ${secondValue} = ${result}.`)
     }

     if (args[1] == 'x') {
      let result = firstValue * secondValue
      message.channel.send(`${firstValue} x ${secondValue} = ${result}`)
     }

     if (args[1] == '/') {
      let result = firstValue / secondValue
      message.channel.send(`${firstValue} / ${secondValue} = ${result}`)
     }
  }
}