'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000']
    })
);



app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});