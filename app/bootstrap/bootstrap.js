const consign = require('consign')

consign({cwd:'app'})
    .include('bootstrap/config.js')
    .then('infra') 
    .then('bootstrap/express.js')
    .then('database')
    .then('modelo')
    .then('repositorio') 
    .then('servico') 
    .then('controlador')
    .then('rota') 
    .then('middleware/erroInterceptor.js')
    .then('bootstrap/runner.js')
    .into({}); 