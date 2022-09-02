const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const { mod } = require("../log.json")

const db = require("orio.db")

const data = {
    name:"uyarı-sil",
    description:"Suncudan Belirtilen Kullanıcının Uyarıları Silinir",
    permission:"MODERATE_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { guild } = interaction
        const { embed } = interaction.client

        const user = interaction.options.getMember("kullanıcı")

        const deleted = db.fetch(`warn_number_${interaction.guild.id}_${user.id}`)

        if(!deleted) return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcının Bir Uyarısı Bulunmamaktadır`,"RED")]})

        db.delete(`warn_number_${interaction.guild.id}_${user.id}`)
        db.delete(`warn_reason_${interaction.guild.id}_${user.id}`)
        db.delete(`warn_${interaction.guild.id}_${user.id}`)
        
        const Lembed = new MessageEmbed()
            .setColor("#5865F2")
            .setTitle("Kullanıcının Uyarıları Silindi")
            .addFields([
                { name: "Kullanıcı",value: `${user}`,inline: true },
                { name: "Moderatör",value: `${interaction.user}`,inline: true },
                { name: "Zaman",value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}>`,inline: true }
            ])
        interaction.client.channels.cache.get(mod).send({embeds:[Lembed]})

        return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcının Uyarıları Silindi`,"#5865F2")]})

    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addUserOption(option => 
        option.setName("kullanıcı")
        .setDescription("Lütfen Uyarıları Silinecek Kullanıcıyı Belirtiniz")
        .setRequired(true)
        )
    module.exports = { data, slash_data }