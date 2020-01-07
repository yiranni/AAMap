const express = require('express');

let app = express();

app.use('/home', require('./models/home/router'));
app.use('/api/meetings');

module.exports = app;