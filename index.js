const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "Maniac Member"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content === 'ping') {
    message.reply('pong');
  };
  if(message.content === '!help') {
    let embed = new Discord.RichEmbed()
    let commandList = [
      {name: '!채광가이드', desc: '채광 관련 가이드 주소 공유'},
      {name: '!운송가이드', desc: '운송 관련 가이드 주소 공유'},
      {name: '!생산가이드', desc: '생산 관련 가이드 주소 공유'},
      {name: '!복지가이드', desc: '코퍼레이션의 복지 안내'},
    ];
    let commandStr = '';
    message.channel.send(embed)
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of MMSQANSWERBOT', helpImg)
      .setColor('#FE2E2E')
      .setFooter(`명령어를 입력하세요.`)
      .setTimestamp()
      
   //}// else if(message.content == '!채광가이드') {
    //let embed = new Discord.RichEmbed()
    //  .setAuthor('Help of 콜라곰 BOT', helpImg)
    //  .setColor('#186de6')
    //  .setFooter(`콜라곰 BOT ❤️`)
    // .setTimestamp()
      
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });
  
    embed.addField('Commands: ', commandStr);
  
    message.channel.send(embed)
  };
});



client.login(token);