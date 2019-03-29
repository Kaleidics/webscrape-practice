'use strict';

const rp = require('require-promise');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
    .then(html => {
        console.log(html);
    })
    .catch(err => {
        console.log(err);
    });