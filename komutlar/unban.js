const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const { mod } = require("../log.json")

const db = require("orio.db")

const data = {
    name:"unban",
    description:"Suncudan Belirtilen ID'deki Kullanıcının Yasağını Kaldırır",
    permission:"BAN_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { guild } = interaction
        const { embed } = interaction.client

        const user = interaction.options.getUser("kullanıcı")
        const reason = interaction.options.getString("sebep")

        guild.members.unban(user, reason).then(() => {
            
            const Lembed = new MessageEmbed()
            .setColor("#5865F2")
            .setTitle("Kullanıcı Affedildi")
            .addFields([
                { name: "Kullanıcı",value: `${user}`,inline: true },
                { name: "Moderatör",value: `${interaction.user}`,inline: true },
                { name: "Gerekçe",value: `${reason}`,inline: true },
                { name: "\u200b",value: `\u200b`,inline: true},
                { name: "Zaman",value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}>`,inline: true },
                { name: "\u200b",value: `\u200b`,inline: true}
            ])
            interaction.client.channels.cache.get(mod).send({embeds:[Lembed]})

            return interaction.reply({embeds:[embed("",`**${user}** Adlı Kullanıcı **"${reason}"** Sebebiyle Affedildi`,"#5865F2")]})

        }).catch(() => {
            return interaction.reply({embeds:[embed("",`**${user}** Adında Bir Yasaklı Kullanıcı Bulunmamaktadır`,"RED")]})
        })
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addUserOption(option => 
        option.setName("kullanıcı")
        .setDescription("Lütfen Bir Kullanıcı ID'si Giriniz")
        .setRequired(true)
        )
    .addStringOption(opt => 
        opt.setName("sebep")
        .setDescription("Kullanıcıyı Yasaklamak İçin Bir Sebep Belirtmelisniz")
        .setRequired(true)
        )
    module.exports = { data, slash_data }