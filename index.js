const os = require('os')
const cluster = require('cluster')

function carregarAplicacao(){
    require('./app/bootstrap/bootstrap'); 
}

function criarCluster(){
    os.cpus()
        .forEach(() => cluster.isMaster ? cluster.fork() : carregarAplicacao()); 
}

process.env["NODE_ENV"] == "production" ? criarCluster() : carregarAplicacao(); 