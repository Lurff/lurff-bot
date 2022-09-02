const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const ms = require("milisaniye")
const { kayıt } = require("../log.json")

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

        interaction.member.setNickname(user)
        interaction.member.roles.remove("856131350913351681")
        interaction.member.roles.add("909840966368780310")

        interaction.reply({embeds:[embed("",`${interaction.member} Başarılı Bir Şekilde Kaydınız Tamamlanmıştır`,"BLURPLE")]})

        const Log = new MessageEmbed()
        .setTitle("Kullanıcı Kayıt Oldu")
        .setDescription(`${interaction.user} Adlı Kullanıcı <t:${Math.floor(interaction.createdTimestamp / 1000)}> Tarihinde **"${user}"** Adlı İsim İle Kayıt Oldu`)
        .setColor("#36393F")
        .setFooter({text:`Kayıt Olan Kullanıcı ID: ${interaction.user.id}`})
        interaction.client.channels.cache.get(kayıt).send({embeds:[Log]})
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