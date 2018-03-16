const express = require('express'); 
const safira = require('safira');

const bodyParser = require('body-parser'); 

const app = express(); 
app.use(bodyParser()); 

safira.defineObject(app,'app'); 