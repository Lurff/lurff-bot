const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const db = require("orio.db")
const { ChannelType } = require("discord-api-types/v9")

const data = {
    name:"ticket",
    description:"Ticket Ayarlamaları Yapılır",
    permission:"BAN_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client
        
        const ticket = new MessageEmbed()
        .setColor("#2F3136")
        .setTitle("Talep Oluştur")
        .setDescription(`
        
        \`>\` Kayıtda sorun yaşıyorsanız talep açınız.
        \`>\` Birini bildirmek istiyorsanız kanıtınızla birlikte talep oluşturunuz.
        \`>\` Talep oluşturduktan sonra yetkilileri bir daha etiketlemeyiniz.
        
        `)
        .setFooter({text:`Gereksiz talep açanlar 24 saat susturulacaktır`})
        
        const ticketBtn = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId("ticket")
          .setLabel("Talep Oluştur")
          .setStyle("PRIMARY")
          .setEmoji("📩")
        )
        
        interaction.client.channels.cache.get("977897353111568384").send({embeds:[ticket],components:[ticketBtn]})
      
      return interaction.reply({embeds:[embed("","Ticket Kanalına Mesaj Gönderilmiştir","BLURPLE")],ephemeral: true})
        
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    
    module.exports = { data, slash_data }