'use strict';

const rp = require('request-promise');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

const cheerio = {
    scraper: function () {
        return rp(url)
    }
}

module.exports = cheerio;