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
    //using scraper method from potusScraper.js
    cheerio.scraper()
        .then(text => { 
        console.log(text.slice(0,10));
    });
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});