const axios = require("axios");
const cheerio = require("cheerio");

/**
 * @property {string} url - The URL to fetch html from.
 * @property {string} htmlResult - The fetched html result.
 * @property {string} selecor - The selecor that will loop for each one.
 * @property {Array} data - The data final data.
 */
class Scraper {
  /**
   * @param {string} url - The url to scrape.
   * @param {string} selecor - The selecor for the elements you wanna loop through.
   * */
  constructor(url, selecor = "") {
    this.url = url;
    this.htmlResult = "";
    this.selecor = selecor;
    this.data = [];
  }

  /**
   * @return {Promise} - fetch the html from the url and assigne it to the htmlResult variable.
   * */
  async fetchUrl() {
    this.htmlResult = await axios.get(this.url);
  }

  /**
   * @retrun {Scraper} - use cheerio to load the htmlResult and get the needed data and add it to the data array.
   * */
  async getData() {
    await this.fetchUrl();

    const $ = cheerio.load(this.htmlResult.data);

    $("#preview")
      .find(this.selecor)
      .each((index, element) => {
        const deal = {
          link: this.url + $(element).find(".more").attr("href"),
          time: $(element).find(".bundle-time").text(),
          title: $(element).find(".bundle-title a").text(),
          shopTitle: $(element).find(".bundle-title .shopTitle").text(),
        };
        this.data.push(deal);
      });

    return this;
  }
}

// new Scraper("https://isthereanydeal.com/", ".cntBoxContent .bundle-preview")
//   .getData()
//   .then(function (data) {
//     console.log(data.data);
//   });

module.exports = Scraper;
