const { Client, Message, MessageEmbed, Collection, Discord, MessageActionRow, MessageButton, MessageSelectMenu, MessageMenu, MessageMenuOption, MessageAttachment } = require("discord.js");
const { createTranscript } = require('discord-html-transcripts');
const { ticket,ticke_arşiv } = require("../log.json")

module.exports = (client) => {

    client.on("interactionCreate",async i => {
        if(!i.isButton()) return;
        
        if(i.customId === "ticket"){
           i.guild.channels.create(`${i.member.user.username} Ticket`, {
  type: 'GUILD_TEXT',
  permissionOverwrites: [
     {
       id: i.guild.id,
       deny: ["VIEW_CHANNEL"],
    },
    {
      id: i.member.id,
      deny: ["MANAGE_CHANNELS"],
      allow: ["VIEW_CHANNEL","SEND_MESSAGES"]
    },
    {
      id:"874969646523088906",
      allow: ["VIEW_CHANNEL","SEND_MESSAGES"]
    },
    {
      id:"909840960421249064",
      allow: ["VIEW_CHANNEL","SEND_MESSAGES"]
    }
  ],
}).then( ch => {
     const d = new MessageEmbed()
     .setAuthor({name:"Ticket Açıldı"})
     .setColor("BLURPLE")
     .setDescription("Kanalı Kapatmak İçin Aşağıdaki Kapat Butonuna Tıklaman Yeterlidir")
    const b = new MessageActionRow()
     .addComponents(
		new MessageButton()
		.setCustomId('kapat')
		.setLabel(`Kapat`)
		.setStyle('DANGER'))
  ch.send({content:`${i.member}`, embeds:[d],components:[b] });
 
    const ticketLog = new MessageEmbed()
    .setColor("#57F287")
    .setTitle("Talep Açılmıştır")
    .addFields([
    {name:"Açılan Ticket ID",value:`${i.channel.name},(${i.channel.id})`,inline:true},
    {name:"Talep Açan Kullanıcı",value:`${i.user}`,inline:true},
    {name:"Talebin Açılma Zamanı",value:`<t:${parseInt(Date.now() / 1000)}>`}
  ])
  client.channels.cache.get(ticket).send({embeds:[ticketLog]})
             
i.reply({content:`Başarılı Bir Şekilde ${ch} Ticket Kanalınız Açılmıştır`,ephemeral:true})

})
}
  if(i.customId === "kapat"){
    i.reply({content:"Ticket Kapatılıyor",ephemeral:true})
    i.channel.delete()
        
    const dosya = await createTranscript(i.channel, {
          limit: -1,
          returnType: 'attachment',
          returnBuffer: false,
          fileName: `${i.channel.name}.html`,
        })
    
//     const transcript = new MessageEmbed()
//     .setColor("#2F3136")
//     .setTitle("Talep Depolanmıştır")
//     .setDescription(`Depolanan Talep Kaydına Ulaşmak İçin [Buraya](https://ash-elemental-fig.glitch.me/${dosya.fileName}) Tıklayınız`)
    
    
    client.channels.cache.get(ticke_arşiv).send({files:[dosya]})

    const ticketLog = new MessageEmbed()
    .setColor("#ED4245")
    .setTitle("Talep Kapatılmıştır")
    .addFields([
    {name:"Kapatılan Ticket ID",value:`${i.channel.name},(${i.channel.id})`,inline:true},
    {name:"Talep Kullanıcı(Yetkili)",value:`${i.user}`,inline:true},
    {name:"Talebin Kapatılma Zamanı",value:`<t:${parseInt(Date.now() / 1000)}>`}
  ])
  client.channels.cache.get(ticket).send({embeds:[ticketLog]})
    
  }
})  
}