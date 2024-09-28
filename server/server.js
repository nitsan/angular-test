const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('express-favicon');
const movies = require('./movies.json');


const app = express();
app.use(logger('dev'));
app.use(favicon(__dirname + '/../src/favicon.ico'));
app.use(express.static(path.join(__dirname, '..', 'dist', 'angular-test', 'browser')));

app.use('/api/movies', (req, res) => {
  res.json(movies);
});
app.listen(3000, function () {
  console.log(`app listening on port ${3000}!`);
});

module.exports = app;
