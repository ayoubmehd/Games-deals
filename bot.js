const fs = require("fs");

const { keyv } = require("./database.js");
const path = require("path");

const prefix = "!";

require("dotenv").config();
// require the discord.js module

const Discord = require("discord.js");
function setCommands(client) {
  client.commands = new Discord.Collection();

  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }
}

/**
 * @param {Object[]} data - data needed to send to the channel.
 * @param {String} data.link - link of the deal details.
 * @param {String} data.time - time left for deal to expier.
 * @param {String} data.title - title of the deal.
 * @param {String} data.shopTitle - shop containing the deal.
 */
module.exports = async function (data) {
  const result = await keyv.get("CHANNEL_ID");
  const CHANNEL_ID = result ? result : "";
  // create a new Discord client
  const client = new Discord.Client();
  setCommands(client);
  // when the client is ready, run this code
  // this event will only trigger one time after logging in
  client.once("ready", () => {
    console.log("Ready!");

    if (!CHANNEL_ID) return;
    data.forEach((deal) => {
      const embed = new Discord.MessageEmbed();
      embed.setTitle(deal.title);
      embed.setAuthor(deal.shopTitle);
      embed.setFooter(deal.time);
      embed.setURL(deal.link);
      client.channels.cache.get(CHANNEL_ID).send(embed);
    });
  });
  client.on("message", (msg) => {
    if (CHANNEL_ID) return;

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
      client.commands.get(command).execute(msg, args);
    } catch (error) {
      console.log(error);
      msg.channel.send("There was an error executing this command");
    }
  });
  // login to Discord with your app's token
  client.login(process.env.BOT_TOKEN);
};
