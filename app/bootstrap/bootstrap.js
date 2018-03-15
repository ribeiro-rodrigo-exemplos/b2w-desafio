const consign = require('consign')

consign({cwd:'app'})
    .include('bootstrap/config.js') 
    .then('bootstrap/express.js')
    .then('bootstrap/runner.js')
    .into({}); 