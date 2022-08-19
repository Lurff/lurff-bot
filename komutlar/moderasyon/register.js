const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const ms = require("milisaniye")

const db = require("orio.db")

const data = {
    name:"kayıt",
    description:"Sunucuya Kayıt Olursunuz",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction.options.getString("kullanıcı-adı")
        
        if(interaction.member.roles.cache.has("909840966368780310")) return;

        if(interaction.channel.id !== "1010175926774013952") return;

        const register_role = "909840966368780310"

        interaction.member.setNickname(user)
        interaction.member.roles.remove("856131350913351681")
        interaction.member.roles.add(register_role)

        interaction.reply({embeds:[embed("",`${interaction.member} Başarılı Bir Şekilde Kaydınız Tamamlanmıştır`,"BLURPLE")]})

        const Log = new MessageEmbed()
        .setTitle("Kullanıcı Kayıt Oldu")
        .addFields([
            {name:"Kayıt Olan Kullanıcı",value:`${interaction.user}(${interaction.user.id})`,inline:true},
            {name:"Kayıt Olma Zamanı",value:`<t:${Math.floor(interaction.createdTimestamp/1000)}>`,inline:true},
        ])
        .setColor("#2F3136")
        .setFooter({text:`${interaction.user.username} Adlı Kullanıcı ${user} İsmiyle Kayıt Oldu`})
        .setTimestamp(interaction.createdTimestamp)
        interaction.client.channels.cache.get("1010177025820069988").send({embeds:[Log]})
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addStringOption(option => 
        option.setName("kullanıcı-adı")
        .setDescription("Sunucuda Gözükmesini İstediğiniz İsmi Giriniz")
        .setRequired(true)
        )
    module.exports = { data, slash_data }