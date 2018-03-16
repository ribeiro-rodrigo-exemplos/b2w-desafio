const safira = require('safira'); 

const controlador = safira.bean('planetaController'); 
const app = safira.bean('app'); 

app.route('/v1/planetas')
    .get(controlador.listarPlanetas.bind(controlador)) 
    .post(controlador.criarPlaneta.bind(controlador)); 

app.route('/v1/planetas/:id') 
    .get(controlador.obterPlanetaPorId.bind(controlador))
    .delete(controlador.removerPlaneta.bind(controlador)); 

