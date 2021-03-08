require("dotenv").config();
// require the discord.js module
const Discord = require("discord.js");

/**
 * @param {Object[]} data - data needed to send to the channel.
 * @param {String} data.link - link of the deal details.
 * @param {String} data.time - time left for deal to expier.
 * @param {String} data.title - title of the deal.
 * @param {String} data.shopTitle - shop containing the deal.
 */
module.exports = function (data) {
  // create a new Discord client
  const client = new Discord.Client();

  // when the client is ready, run this code
  // this event will only trigger one time after logging in
  client.once("ready", () => {
    console.log("Ready!");
    data.forEach((deal) => {
      const embed = new Discord.MessageEmbed();
      embed.setTitle(deal.title);
      embed.setAuthor(deal.shopTitle);
      embed.setFooter(deal.time);
      embed.setURL(deal.link);
      client.channels.cache.get(process.env.CHANNEL_ID).send(embed);
    });
  });

  // login to Discord with your app's token
  client.login(process.env.BOT_TOKEN);
};
