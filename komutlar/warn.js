const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const { mod } = require("../log.json")

const db = require("orio.db")

const data = {
    name:"uyar",
    description:"Suncudan Belirtilen Kullanıcı Uyarılır",
    permission:"MODERATE_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { guild } = interaction
        const { embed } = interaction.client

        const user = interaction.options.getMember("kullanıcı")
        const reason = interaction.options.getString("sebep")
        const attechment = interaction.options.getAttachment("görsel")

        if(!user.moderatable) return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı Hakkında Bir İşlem Yapılamamaktadır`,"RED")]})

        db.add(`warn_number_${interaction.guild.id}_${user.id}`,1)

        const warnNumber = db.fetch(`warn_number_${interaction.guild.id}_${user.id}`)
        db.push(`warn_reason_${interaction.guild.id}_${user.id}`,`${reason}\n`)
        db.push(`warn_${interaction.guild.id}_${user.id}`,`**${warnNumber}.${reason}**\n *» ${interaction.user} Tarafından <t:${Math.floor(interaction.createdTimestamp/1000)}> Zamanında Oluşturuldu*\n`)

        const userLog = new MessageEmbed()
        .setAuthor({name:`${interaction.guild.name} Adlı Sunucu Tarafından Uyarıldınız`,iconURL:interaction.guild.iconURL({dynamic:true})})
        .setColor("RED")
        .setDescription(`
        **Uyarılma Sebebi:** \`\`${reason}\`\`
        **Uyaran Yetkili:** ${interaction.user}
        **Uyarılma Zamanı:** <t:${Math.floor(interaction.createdTimestamp/1000)}>
        
        **Ceza Görseli**
        `)
        .setImage(attechment.url)
        .setFooter({text:`${interaction.user.tag} | Uyarılma Zamanı`,iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setTimestamp(interaction.createdTimestamp)

        user.send({embeds:[userLog]})
        .catch(() => {
            return;
        })

        const Lembed = new MessageEmbed()
        .setColor("#5865F2")
        .setTitle("Kullanıcı Uyarıldı")
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

        return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı **"${reason}"** Sebebiyle Uyarılmıştır`,"#5865F2")]})

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
        .setDescription("Uyarmak İçin Bir Sebep Girmelisiniz")
        .setRequired(true)
        )
    .addAttachmentOption(opti =>
        opti.setName("görsel")
        .setDescription("Ceza Görselini Atınız")
        .setRequired(true)
        )
    module.exports = { data, slash_data }