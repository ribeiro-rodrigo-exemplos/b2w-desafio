const consign = require('consign')

consign({cwd:'app'})
    .include('bootstrap/config.js') 
    .then('bootstrap/express.js')
    .then('database')
    .then('repositorio') 
    .then('servico') 
    .then('controlador')
    .then('rota') 
    .then('bootstrap/runner.js')
    .into({}); 