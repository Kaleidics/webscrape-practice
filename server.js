'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const cheerio = require('./potusScraper');

app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000']
    })
);

app.get('/', (req, res) => {
    let { scraper, dynamicScraper } = cheerio;

    // scraper()
    //     .then(html => {
    //         // console.log(html.slice(0, 12));
    //         res.send(html);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    res.json(dynamicScraper());
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});