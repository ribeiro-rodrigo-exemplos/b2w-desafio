const express = require('express'); 
const safira = require('safira');

const bodyParser = require('body-parser'); 

const app = express(); 
app.use(bodyParser.json()); 

safira.defineObject(app,'app'); 