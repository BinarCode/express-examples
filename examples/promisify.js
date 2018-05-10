const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();
const util = require('util');

// promisify a native node.js function
const readFileAsync = util.promisify(fs.readFile);

app.get('/', async (req, res, next) => {
  try {
    let content = await readFileAsync(path.join(__dirname, 'files/example.txt'));
    return res.status(200).send(content);
  } catch (e){
    next(e);
  }
});


// custom function with callback
function myCallbackFunction(callback){
  // we use the default node.js error first callback style
  callback(null, 'Here is my message from callback transformed into a promise');
}

// promisify a custom callback function
const promisedCallback = util.promisify(myCallbackFunction);

app.get('/promised', async (req, res, next) => {
  try {
    let message = await promisedCallback();
    return res.status(200).send(message);
  } catch (e){
    next(e);
  }
});

app.listen(3000, () => console.log('Promisify example started'));