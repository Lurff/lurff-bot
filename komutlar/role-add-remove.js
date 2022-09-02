const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const { mod } = require("../log.json")

const db = require("orio.db")

const data = {
    name:"rol",
    description:"Seçilen Kullanıcıya Belirtilen Rol Verir Veya Alır",
    permission:"BAN_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction.options.getMember("kullanıcı")
        const remove = interaction?.options.getRole("al")
        const add = interaction?.options.getRole("ver")
        
        if(remove && add){
            return interaction.reply({embeds:[embed("","İşlemleri Teker Teker Yapınız","RED")]})
        }
        else if(add){

            if(!user.moderatable) return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı Hakkında Bir İşlem Yapılamamaktadır`,"RED")]})

            if(user.roles.cache.has(add.id)) return interaction.reply({embeds:[embed("",`${add} Adlı Rol Kullanıcıda Bulunmaktadır`,"RED")]})
            if(add.rawPosition >= interaction.guild.me.roles.highest.rawPosition) return interaction.reply({embeds:[embed("",`${add} Adlı Rol, Botun Rolünün Üzerinde Bulunduğu İçin İşlem Yapılamamamıştır`,"RED")]})
            user.roles.add(add).then(() => {

            const Lembed = new MessageEmbed()
            .setColor("#5865F2")
            .setTitle("Kullanıcıya Rol Verildi")
            .addFields([
                { name: "Kullanıcı",value:`${user}`,inline:true},
                { name: "Moderatör",value: `${interaction.user}`,inline: true },
                { name: "Verilen Rol",value: `${add}`,inline: true},
                { name: "\u200b",value: `\u200b`,inline: true},
                { name: "Zaman",value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}>`,inline: true },
                { name: "\u200b",value: `\u200b`,inline: true},
            ])
            interaction.client.channels.cache.get(mod).send({embeds:[Lembed]})

            return interaction.reply({embeds:[embed("",`${add} Adlı Rol ${user} Adlı Kullanıcıya Rol Verilmiştir`,"#5865F2")]})

            }).catch(() => {
                return interaction.reply({embeds:[embed("","Bu Kullanıcıya Rol Verilemektedir","RED")]})
            })
            
        }
        else if(remove){

            if(!user.moderatable) return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı Hakkında Bir İşlem Yapılamamaktadır`,"RED")]})

            if(!user.roles.cache.has(remove.id)) return interaction.reply({embeds:[embed("",`${remove} Adlı Rol Kullanıcıda Bulunmamaktadır`,"RED")]})
            if(remove.rawPosition >= interaction.guild.me.roles.highest.rawPosition) return interaction.reply({embeds:[embed("",`${remove} Adlı Rol, Botun Rolünün Üzerinde Bulunduğu İçin İşlem Yapılamamamıştır`,"RED")]})
                
             user.roles.remove(remove).then(() => {
                    interaction.reply({embeds:[embed("",`${remove} Adlı Rol ${user} Adlı Kullanıcıdan Alınmıştır`,"BLURPLE")]})

                    const Lembed = new MessageEmbed()
                    .setColor("#5865F2")
                    .setTitle("Kullanıcıdan Rol Alındı")
                    .addFields([
                    { name: "Kullanıcı",value:`${user}`,inline:true},
                    { name: "Moderatör",value: `${interaction.user}`,inline: true },
                    { name: "Alınan Rol",value: `${remove}`,inline: true},
                    { name: "\u200b",value: `\u200b`,inline: true},
                    { name: "Zaman",value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}>`,inline: true },
                    { name: "\u200b",value: `\u200b`,inline: true},
                    ])
                    interaction.client.channels.cache.get(mod).send({embeds:[Lembed]})

                    return interaction.reply({embeds:[embed("",`${add} Adlı Rol ${user} Adlı Kullanıcıya Rol Verilmiştir`,"#5865F2")]})
                }).catch(() => {
                    return interaction.reply({embeds:[embed("","Bu Kullanıcıya Rol Alınamamaktadır","RED")]})
                
                })
            
        }
        else{
            return interaction.reply({embeds:[embed("","Lütfen Bir Ayar Belirtiniz","RED")]})
        }
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addUserOption(option => 
        option.setName("kullanıcı")
        .setDescription("Lütfen Bir Kullanıcı'yı Seçiniz")
        .setRequired(true)
        )
    .addRoleOption(opt => 
        opt.setName("al")
        .setDescription("Kullanıcıya Seçilen Rolü Alır")
        )
    .addRoleOption(op => 
        op.setName("ver")
        .setDescription("Kullanıcıya Seçilen Rol Verilir")
        )
    module.exports = { data, slash_data }