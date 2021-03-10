const { keyv } = require("../database.js");

module.exports = {
  name: "yes",
  description: "Ping!",
  execute(message, args) {
    console.log(`the channel ${message.channel.id} is now the main channel`);
    keyv.set("CHANNEL_ID", message.channel.id);
  },
};
