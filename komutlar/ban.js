const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { mod } = require("../log.json")

const db = require("orio.db")

const data = {
    name:"ban",
    description:"Suncudan Seçtiğiniz Üyeyi Yasaklar",
    permission:"BAN_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction.options.getMember("kullanıcı")
        const reason = interaction.options.getString("sebep")
        const attechment = interaction.options.getAttachment("görsel")

        if(!user.bannable) return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı Hakkında Bir İşlem Yapılamamaktadır`,"RED")]})

        user.ban({ reason: reason }).then(() => {

            const Lembed = new MessageEmbed()
            .setColor("#5865F2")
            .setTitle("Kullanıcı Yasaklandı")
            .addFields([
                { name: "Kullanıcı",value: `${user}`,inline: true },
                { name: "Moderatör",value: `${interaction.user}`,inline: true },
                { name: "Gerekçe",value: `${reason}`,inline: true },
                { name: `Ceza Görseli`,value: `\u200b`,inline: true },
                { name: "\u200b",value:`\u200b`,inline: true },
                { name: "Zaman",value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}>`,inline: true }
            ])
            .setImage(attechment.url)
            interaction.client.channels.cache.get(mod).send({embeds:[Lembed]})
        })

        return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı Sunucudan Yasaklandı`,"#5865F2")]})
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
    .addStringOption(opt => 
        opt.setName("sebep")
        .setDescription("Kullanıcıyı Yasaklamak İçin Bir Sebep Belirtmelisniz")
        .setRequired(true)
        )
    .addAttachmentOption(opti => 
        opti.setName("görsel")
        .setDescription("Kanıt Görselini Atınız")
        .setRequired(true)
        )
    module.exports = { data, slash_data }