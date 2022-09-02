const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const { mod } = require("../log.json")

const db = require("orio.db")

const data = {
    name:"sil",
    description:"Belirtilen Sayıdaki Mesajları Siler",
    permission:"MANAGE_MESSAGES",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction.options.getInteger("sayı")

        interaction.channel.bulkDelete(user).then(() => {
            
            const Lembed = new MessageEmbed()
            .setColor("#5865F2")
            .setTitle("Mesajlar Silindi")
            .addFields([
                { name: "Moderatör",value: `${interaction.user}`,inline: true },
                { name: "Silinen Mesaj Sayısı",value: `${user}`,inline: true},
                { name: "Zaman",value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}>`,inline: true }
            ])
            interaction.client.channels.cache.get(mod).send({embeds:[Lembed]})

            return interaction.reply({embeds:[embed("",`Başarılı Bir Şekilde **${user}** Mesaj Silindi`,"#5865F2")]})

        }).catch(() => {
            return interaction.reply({embeds:[embed("","14 Günden Önceki Mesajlar Silinemez","RED")]})
        })

    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addIntegerOption(option => 
        option.setName("sayı")
        .setDescription("Silinecek Mesaj Sayısını Yazınız")
        .setMaxValue(101)
        .setMinValue(0)
        .setRequired(true)
        )
    module.exports = { data, slash_data }