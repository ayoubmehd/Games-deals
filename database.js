const Keyv = require("keyv");

const keyv = new Keyv("sqlite://db/channels.sqlite");

module.exports = {
  keyv,
};

keyv.on("error", (err) => console.error("Keyv connection error:", err));
