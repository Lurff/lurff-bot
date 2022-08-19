const { MessageEmbed } = require("discord.js")

module.exports = (client) => {

    client.on("guildMemberAdd",async (member) => {

        let guild = client.guilds.cache.get("855896577248067584")
  
        let sunucu_sayısı = guild.memberCount
  
        const log = new MessageEmbed()
        .setAuthor({name:`${member.displayName}`,iconURL:member.user.displayAvatarURL()})
        .setColor("GREEN")
        .setDescription(`${member} Adlı Kullanıcı Sunucuya Giriş Yaptı (Toplam Kullanıcı: \`\`${sunucu_sayısı}\`\`)`)
  
        client.channels.cache.get("1010163521897631795").send({embeds:[log]})

        if(member.user.bot){ 
            const bot_role = "924924701179007007"

            member.roles.add(bot_role).then(() => {

                let log = "1010164302893809744"

                const Log = new MessageEmbed()
                .setTitle("Otorol Verildi")
                .setColor("#2F3136")
                .addFields([
                    {name:"Otorol Verilen Kullanıcı",value:`${member}(${member.user.bot ? "Bot" : "Kullanıcı"})`,inline: true},
                    {name:"Verilen Rol",value:`<@&${bot_role}>`,inline: true},
                    {name:"Rol Verilme Zamanı",value:`<t:${Math.floor(member.joinedTimestamp/1000)}>`,inline: true}
                ])
                .setFooter({text:`Rol Verilen Kullanıcı ID: ${member.id}`})
                .setTimestamp(member.joinedTimestamp)
                client.channels.cache.get(log).send({embeds:[Log]})
            }).catch(() => {
                return;
            })
        }
        if(!member.user.bot){

            const member_role = ["856131350913351681"]

            member.roles.add(member_role).then(() => {

                let log = "1010164302893809744"

                const Log = new MessageEmbed()
                .setTitle("Otorol Verildi")
                .setColor("#2F3136")
                .addFields([
                    {name:"Otorol Verilen Kullanıcı",value:`${member}(${member.user.bot ? "Kullanıcı" : "Bot"})`,inline: true},
                    {name:"Verilen Rol",value:`<@&${bot_role}>`,inline: true},
                    {name:"Rol Verilme Zamanı",value:`<t:${Math.floor(member.joinedTimestamp/1000)}>`,inline: true}
                ])
                .setFooter({text:`Rol Verilen Kullanıcı ID: ${member.id}`})
                .setTimestamp(member.joinedTimestamp)
                client.channels.cache.get(log).send({embeds:[Log]})
             }).catch(() => {
                return;
            })
        }
      
    })
    
    client.on("guildMemberRemove", async (member) => {      
                
        let guild = client.guilds.cache.get("855896577248067584")
  
        let sunucu_sayısı = guild.memberCount
  
        const log = new MessageEmbed()
        .setAuthor({name:`${member.displayName}`,iconURL:member.user.displayAvatarURL()})
        .setColor("RED")
        .setDescription(`${member} Adlı Kullanıcı Sunucudan Çıkış Yaptı (Toplam Kullanıcı: \`\`${sunucu_sayısı}\`\`)`)
  
        client.channels.cache.get("1010163521897631795").send({embeds:[log]})    

      })

}
