'use strict';
/*jshint esversion: 6 */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/test', (req, res) => {
  console.log('req.body', req.body);
  const {cookieKey, domain} = req.body;
  console.log('Cookies before:', res.cookies);
  res.cookie(cookieKey, 'bbb', {domain: domain, path: '/', sameSite: 'none'})
  console.log('Cookies after:', res.cookies);
  res.json({[cookieKey]: 'bbb'});
});

app.get('/iframe', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'inner.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'host.html'));
});

const port = 80;
app.listen(port, function () {
  console.log(`app listening on port ${port}!`);
});

module.exports = app;
