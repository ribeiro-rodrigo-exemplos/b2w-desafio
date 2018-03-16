const mongoose = require('mongoose'); 
const safira = require('safira'); 

const config = safira.bean('config'); 

function connect(){
    const mongoCfg = config.mongodb;
    config.mongodb.url = `mongodb://${mongoCfg.host}:${mongoCfg.port}/${mongoCfg.database}`;
    mongoose.connect(config.mongodb.url,{
        keepAlive: 120, 
        connectTimeoutMS:1000,
        reconnectInterval: 2000,
        poolSize: 10, 
        reconnectTries: Number.MAX_VALUE
    });
}

if(mongoose.connection.readyState)
    return; 

mongoose.Promise = global.Promise; 

process.on('SIGINT',() => mongoose.connection.close(() => process.exit(0)));

connect(); 