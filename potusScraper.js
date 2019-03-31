'use strict';

const rp = require('request-promise');
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const url2 = 'https://www.reddit.com/r/GameDeals/';



const cheerio = {
    scraper: function() {
        return rp(url)
            .then(html => {
                const wikiUrls=[];
                for (let i = 0; i < 45; i++) {
                    wikiUrls.push($('big > a', html)[i].attribs.href);
                }
                return(wikiUrls);
            })
            .catch(err => console.log(err))
    },
    dynamicScraper: function() {
       return puppeteer
            .launch()
            .then(browser => {
                return browser.newPage();
            })
            .then(page => {
                return page.goto(url2)
                    .then(() => {return page.content()});
            })
            .then(html => {
                $('.scrollerItem div article div div a', html).each(function () {
                    console.log($(this).text());
                });
            })
            .catch(err => console.log(err));
    }
    
}

module.exports = cheerio;