const safira = require('safira'); 
const yaml = require('js-yaml'); 
const fs = require('fs'); 

const envs = {
    development: './config/development.yml', 
    production: './config/production.yml', 
    test: './config/test.yml'
}; 

const ambiente = process.env['NODE_ENV'] ? process.env['NODE_ENV'] : 'development'; 
const file = envs[ambiente]; 
const config = yaml.safeLoad(fs.readFileSync(file)); 

safira.defineObject(config,'config'); 

