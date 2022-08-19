const {Client , Collection} = require("discord.js");
const { readdirSync } = require("fs");
require("dotenv").config();

const client = new Client({
    intents:["GUILDS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_VOICE_STATES"]
}) 

client.embed = require("./utils/embed.js")
client.emoji = (emojiName) => client.guilds.cache.get(process.env.owner_sunucu).emojis.cache.find(e => e.name == emojiName)

readdirSync("./events").forEach(async file => {
    const event = await require(`./events/${file}`)
     event(client)
})
//Command Loader
client.commands = new Collection()
readdirSync("./komutlar").forEach(category => {

    readdirSync(`./komutlar/${category}`).forEach(file => {
      const command = require(`./komutlar/${category}/${file}`)
        client.commands.set(command.data.name,command)
    })
})

// Utils İmported

const guildMemberAdd = require("./utils/auto_role.js")
const music = require("./utils/voice_room_config.js")


client.on("ready",() => {
    guildMemberAdd(client)
    music(client)
})


client.login(process.env.token)