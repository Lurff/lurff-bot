const db = require("orio.db")
const { MessageEmbed,Message } = require("discord.js")
const { ses } = require("../log.json")

module.exports = (client,message) => {
   {
  
  
    // Burası kullanıcı yazdığınız ID'li ses kanalına girince Özel Oda oluşturacak kanalın ID'si.       
 
    let kanalİsim = "🏠 -üye_name- | Özel Oda" 
    
    
    let kanalLimit = 99
   
 
     
 
   client.on("voiceStateUpdate", async (oldState, newState) => {
 
       let oldChannel = oldState.channelId
       let newChannel = newState.channelId
       let guild = newState.guild || oldState.guild    
       let member = guild.members.cache.get(newState.id || oldState.id);
 
       let kontrol = 0
       let kont = "936316523088330883"
  
       let kanalID = kont
       let kate = "936316447234330724"
       let yeniKanalKategoriID = kate
       guild.channels.cache.get(kanalID) ? guild.channels.cache.get(kanalID).type === "GUILD_VOICE" ? 0 : kontrol++ : kontrol++ 
       guild.channels.cache.get(yeniKanalKategoriID) ? guild.channels.cache.get(yeniKanalKategoriID).type === "GUILD_CATEGORY" ? 0 : kontrol++ : kontrol++ 
       Number(kanalLimit) ? 0 : kontrol++
       kanalİsim ? kanalİsim.length > 59 ? kontrol++ : 0 : 0
 
       if(kontrol > 0) return;  
       if(!member) return;
 
       if (newChannel === kanalID) {
       if(oldState.member.user.bot) return;
 
        await guild.channels
         .create(kanalİsim.replace("-üye_name-", member.user.username).replace("-üye_tag-", member.user.tag), {
           type: "GUILD_VOICE",
           permissionOverwrites: [
             {
               id: member.user.id,
               allow: [],
               deny: [],
             },
             {
               id: guild.roles.everyone,
               allow: [],
               deny: [],              
             },
           ],
           userLimit: Number(kanalLimit),
           parent: yeniKanalKategoriID,
         }).then(async (x) => {
          member.voice.setChannel(x.id);
  
         db.set(`temproom_${x.id}`, member.id)
          
          
          const Log = new MessageEmbed()
            .setTitle("Özel Kanal Oluşturuldu")
            .addFields([
                {name:"Kanal Oluşturan Kullanıcı",value:`${member}(${member.id})`,inline:true},
                {name:"Kanal Oluşturulma Tarihi",value:`<t:${Math.floor(x.createdTimestamp/1000)}>`,inline:true},
                {name:"Oluşturulan Kanal Adı",value:`${x.name}(${x.id})`}
            ])
            .setColor("#5865F2")
          
          client.channels.cache.get(ses).send({embeds:[Log]})
          
        })             
      } 
 
      if (!oldChannel && newChannel) { } else {
 
        let data = db.get(`temproom_${oldChannel}`)
        if(!data) return;
 
        if(oldState.channel.members.size > 0) return;
 
        oldState.channel.delete().then(x => {
          
          db.delete(`temproom_${oldChannel}`) 
          
           const Log = new MessageEmbed()
            .setTitle("Özel Kanal Silindi")
            .addFields([
                {name:"Silinen Kanal Sahibi",value:`${member}(${member.id})`,inline:true},
                {name:"Kanal Silinme Tarihi",value:`<t:${parseInt(Date.now() / 1000)}>`,inline:true},
                {name:"Silinen Kanal Adı",value:`${x.name}(${x.id})`}
            ])
            .setColor("#ED4245")
          
          client.channels.cache.get(ses).send({embeds:[Log]})
        }).catch(err => { })
 
      }
   })
 }
  
}

