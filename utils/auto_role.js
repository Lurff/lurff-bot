const { MessageEmbed } = require("discord.js")
const { otorol,giriş } = require("../log.json")

module.exports = (client) => {

    client.on("guildMemberAdd",async (member) => {

        let guild = client.guilds.cache.get("855896577248067584")
  
        let sunucu_sayısı = guild.memberCount
  
        const log = new MessageEmbed()
        .setAuthor({name:`${member.displayName}`,iconURL:member.user.displayAvatarURL()})
        .setColor("#57F287")
        .setDescription(`${member} Adlı Kullanıcı Sunucuya Giriş Yaptı (Toplam Kullanıcı: \`\`${sunucu_sayısı}\`\`)`)
  
        client.channels.cache.get(giriş).send({embeds:[log]})

        if(member.user.bot){ 
            const bot_role = "924924701179007007"

            member.roles.add(bot_role).then(() => {

                const Log = new MessageEmbed()
                .setTitle("Otorol Verildi")
                .setColor("#5865F2")
                .setDescription(`${member} Adlı Bota <t:${Math.floor(member.joinedTimestamp/1000)}> Tarihinde Otorol Verildi`)
                .setFooter({text:`Rol Verilen Kullanıcı ID: ${member.id}`})
                .setTimestamp(member.joinedTimestamp)
                client.channels.cache.get(otorol).send({embeds:[Log]})
            }).catch(() => {
                return;
            })
        }
        if(!member.user.bot){

            const member_role = "856131350913351681"

            member.roles.add(member_role).then(() => {

                const Log = new MessageEmbed()
                .setTitle("Otorol Verildi")
                .setColor("#5865F2")
                .setDescription(`${member} Adlı Kullanıcıya <t:${Math.floor(member.joinedTimestamp/1000)}> Tarihinde Otorol Verildi`)
                .setFooter({text:`Rol Verilen Kullanıcı ID: ${member.id}`})
                .setTimestamp(member.joinedTimestamp)
                client.channels.cache.get(otorol).send({embeds:[Log]})
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
        .setColor("#ED4245")
        .setDescription(`${member} Adlı Kullanıcı Sunucudan Çıkış Yaptı (Toplam Kullanıcı: \`\`${sunucu_sayısı}\`\`)`)
  
        client.channels.cache.get(giriş).send({embeds:[log]})    

      })

}
