// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    const welcomeChannel = member.guild.channels.cache.get('725095721698852975');
    welcomeChannel.send(`**Bienvenido <@${member.user.id}> a ${member.guild.name}**  \n\ \n\  **verificate en <#725093028770873405>** \n\ \n\   **<#734470925172342906> para conseguir notificaciones de cuando sean eventos o para personalizar tu perfil que disfrutes la Fogata :blush:**`)
    
  }
}
