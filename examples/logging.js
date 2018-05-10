const express = require('express');
const fs = require('fs');
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream');
const app = express();
const logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
const accessLogStream = rfs('api.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});

// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}));

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));
/**
 * Call this endpoint with ?id=1 and you should receive an object
 * Call it without a query param or with another id and you will receive 404 not found.
 */
app.get('/', function (req, res, next) {
  if (req.query.id === '1') {
    return res.status(200).send({ id: 1, message: 'Object found' })
  }
  return next(new Error('Some error ocurred'));

});

app.listen(3000, () => console.log('Loggin example started'));