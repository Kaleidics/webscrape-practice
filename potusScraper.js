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
                return page.goto(url2, { waitUntil: 'networkidle0' })
                    .then(() => {
                        //attempting to scroll through page to cause loading in more elements, doesn't seem to work
                        page.evaluate(() => {
                            window.scrollBy(0, window.innerHeight);
                        })
                        return page.content()
                    });
            })
            .then(html => {
                //should log the the first post's a tag's href value
                console.log($('.scrollerItem div:nth-of-type(2) article div div:nth-of-type(3) a', html).attr('href'));                    
                const urls = [];
                //should log the total number of a tag's across all posts
                const numLinks = $('.scrollerItem div:nth-of-type(2) article div div:nth-of-type(3) a', html).attr('href').length;
                const links = $('.scrollerItem div:nth-of-type(2) article div div:nth-of-type(3) a', html);

                //was using numLinks as increment counter but was getting undefined, as the pages only seems to load inconsistent between 10-20 elements
                for (let i=0; i<24; i++) {
                    urls.push(links[i].attribs.href);
                }
                
                console.log('start of urls:', urls);
                console.log('scraped urls:', urls.length);
                console.log('numLinks:', numLinks);
                // console.log($('.scrollerItem div:nth-of-type(2) article div div:nth-of-type(3) a', html).length);
            })
            .catch(err => console.log(err));
    }
    
}

module.exports = cheerio;