const logToDiscord = require("./bot");

const Scraper = require("./scrapper");

const scraper = new Scraper(
  "https://isthereanydeal.com",
  ".cntBoxContent .bundle-preview"
);

scraper.getData().then((data) => {
  logToDiscord(data.data);
});
