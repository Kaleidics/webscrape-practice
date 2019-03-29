'use strict';

const rp = require('request-promise');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

const cheerio = {
    scraper: function () {
        rp(url)
            .then(html => {
                //fetches data, should be a string, confirmed by console log
                console.log('scraper is returning data as:', typeof html);
                //return the string to use in server.js '/' route handler, currently getting undefined
                console.log(html.slice(0, 500));
                //it does return html with html tags, head tags and etc...
                return(html);
            })
            .catch(err => {
                return(err);
        });
    }
}

module.exports = cheerio;