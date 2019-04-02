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
    dynamicScraper:
        async function f() {
            const browser = await puppeteer.launch();
            const [page] = await browser.pages();

            await page.goto(url2, { waitUntil: 'networkidle0' });
            const links = await page.evaluate(async () => {
                const scrollfar = document.body.clientHeight;
                console.log(scrollfar); //trying to find the height
                window.scrollBy(0, scrollfar);
                await new Promise(resolve => setTimeout(resolve, 10000)); 
                return [...document.querySelectorAll('.scrollerItem div:nth-of-type(2) article div div:nth-of-type(3) a')]
                    .map((el) => el.href);
            });
            console.log(links, links.length);
           
            await browser.close();
            //how do I return the value to pass to the route handler?
            return (links);
        }
        // return(f());
    
    
}

module.exports = cheerio;