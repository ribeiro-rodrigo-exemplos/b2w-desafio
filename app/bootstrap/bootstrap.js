const consign = require('consign')

consign({cwd:'app'})
    .include('bootstrap/express.js')
    .then('bootstrap/runner.js')
    .into({}); 