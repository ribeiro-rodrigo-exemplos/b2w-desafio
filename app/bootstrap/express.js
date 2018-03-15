const express = require('express'); 
const safira = require('safira');

const app = express(); 

safira.defineObject(app,'app'); 