'use strict';
/*jshint esversion: 6 */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const movies = require('./movies.json');


const app = express();
app.use(cookieParser())
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/movies', (req, res) => {
  res.json(movies);
});
app.listen(3000, function () {
  console.log(`app listening on port ${3000}!`);
});

module.exports = app;
