const check_commands = require("../check_commands.js")

module.exports = client => {
 
  client.once("ready", () => {
    
    console.log("Bot Hazır")
    
    client.user.setActivity("Twitch`te", {type: "STREAMING", url:"https://www.twitch.tv/lurff_"})
    check_commands(client)

  })
    
}
