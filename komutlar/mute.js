const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const ms = require("milisaniye")
const { mod } = require("../log.json")

const db = require("orio.db")

const data = {
    name:"sustur",
    description:"Suncudan Seçtiğiniz Üyeyi Süreli Olarak Susturur",
    permission:"BAN_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction.options.getMember("kullanıcı")
        const time = interaction.options.getString("süre")
        const reason = interaction?.options.getString("sebep")
        const attechment = interaction.options.getAttachment("görsel")

        if(time === "0" ) return interaction.reply({embeds:[embed("","Kullanıcıyı Susturmak İçin Örnek Parametreleri \n`1 Gün, 1 Saat, 1 Dakika, 1 Yıl, 1 Ay` Giriniz","RED")]})

        const tme = ms(time)

        if(!user.moderatable) return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı Hakkında Bir İşlem Yapılamamaktadır`,"RED")]})

        user.timeout(tme,reason).then(() => {
            
            const Lembed = new MessageEmbed()
            .setColor("#5865F2")
            .setTitle("Kullanıcı Susturuldu")
            .addFields([
                { name: "Kullanıcı",value: `${user}`,inline: true },
                { name: "Moderatör",value: `${interaction.user}`,inline: true },
                { name: "Gerekçe",value: `${reason}`,inline: true },
                { name: `Ceza Görseli`,value: `\u200b`,inline: true },
                { name: "Cezanın Bitme Süresi",value:`<t:${parseInt((Date.now() + tme) / 1000)}:R>`,inline: true },
                { name: "Zaman",value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}>`,inline: true }
            ])
            .setImage(attechment.url)
            interaction.client.channels.cache.get(mod).send({embeds:[Lembed]})
        })

        return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı Susturuldu`,"#5865F2")]})

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
    .addStringOption(opti => 
        opti.setName("süre")
        .setDescription("Ne Kadar Süredir Susturululacağını Belirtiniz Örnek Parametre: 1 Gün, 1 Saat, 1 Dakika, 1 Yıl, 1 Ay")
        .setRequired(true)
        )
    .addStringOption(opt => 
        opt.setName("sebep")
        .setDescription("Kullanıcıyı Yasaklamak İçin Bir Sebep Belirtmelisniz")
        .setRequired(true)
        )
    .addAttachmentOption(optin => 
        optin.setName("görsel")
        .setDescription("Kanıt Görselini Atınız")
        .setRequired(true)
        )
    module.exports = { data, slash_data }