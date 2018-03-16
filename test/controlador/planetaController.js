const request = require('supertest'); 
const assert = require('assert'); 
const safira = require('safira'); 

const DatabaseCleaner = require('database-cleaner');
const MongoClient = require('mongodb').MongoClient; 

require('../../app/bootstrap/bootstrap'); 

let app; 
let planetaRepository; 
let swApiService; 
let todosOsPlanetas; 
let databaseCleaner; 
let config; 

function salvarPlaneta(planeta){
    return planetaRepository.adicionarPlaneta(planeta)
}

function obterPlaneta(id){
    return planetaRepository.obterPlanetaPorId(id); 
}

function salvarPlanetas(planetas){
    planetas.forEach(planeta => salvarPlaneta(planeta));
}

function removerPlaneta(planeta){
    planetaRepository.removerPlaneta(planeta.id); 
}

function limparBanco(done){
    MongoClient.connect(config.mongodb.url,(error,client) => 
        databaseCleaner.clean(client.db('test'),() => done())
    ); 
}

describe('Testando o controlador planetaController', () => {

    before(() => {
        app = safira.bean('app')
        config = safira.bean('config'); 
        planetaRepository = safira.bean('planetaRepository'); 
        swApiService = safira.bean('swApiService'); 
        databaseCleaner = new DatabaseCleaner('mongodb'); 
    }); 

    beforeEach(done => {

        limparBanco(done); 

        todosOsPlanetas = [
            {nome:"Marte",clima:"Semiárido",terreno:"deserto"}, 
            {nome:"Plutão",clima:"Frio",terreno:"deserto"}, 
            {nome:"Jupiter",clima:"Desértico",terreno:"deserto"}
        ];
    }); 

    it('#Retornando todos os planetas',done => {

       salvarPlanetas(todosOsPlanetas); 

       request(app)
            .get('/v1/planetas')
            .expect('Content-Type',/json/)
            .timeout(1000) 
            .expect(200) 
            .end((error,res) => {
                assert(res.body.length === todosOsPlanetas.length)
                done()
            }) 

    }); 

    it("#Nenhum planeta retornado",done => {
        
        request(app)
            .get('/v1/planetas')
            .timeout(1000) 
            .expect(204) 
            .end(done)  
    }); 

    it("#Retornando planeta por id",done => {

        const planeta = {nome:"Tatooine",clima:"arid",terreno:"desert",participacoes:5}; 
        
        salvarPlaneta(planeta)
            .then(planeta => {
                request(app)
                .get(`/v1/planetas/${planeta.id}`)
                .expect('Content-Type',/json/) 
                .timeout(1000)
                .expect(200)
                .end(done); 

            })
    })

    it("#Planeta não encontrado",done => {

        request(app)
            .get('/v1/planetas/1')
            .timeout(1000)
            .expect(404)
            .end(done); 
    })

    it("#Removendo planeta",done => {

        const planeta = {nome:"Tatooine",clima:"arid",terreno:"desert",participacoes:5};

        salvarPlaneta(planeta)
            .then(planeta => {
                request(app)
                .delete(`/v1/planetas/${planeta.id}`)
                .timeout(1000)
                .expect(204)
                .end(() => {
                    obterPlaneta(planeta.id)
                        .then(planetaRemovido => assert(!planetaRemovido))
                        .then(() => done())
                }); 
            })
    });

    it("#Adicionando planeta",done => {

        swApiService.obterParticipacoesDoPlanetaEmFilmes = () => Promise.resolve(12); 
        
        const planeta = {nome:"Tatooine",clima:"arid",terreno:"desert"};
        
        const retornoEsperado = Object.assign({},planeta); 
        retornoEsperado.participacoes = 12; 

        request(app)
            .post('/v1/planetas')
            .timeout(1000)
            .send(planeta)
            .expect(201)
            .expect('Content-Type',/json/)
            .expect('Location',/v1\/planetas/)
            .end((error,res) => {
                assert(res.body._id)
                assert(res.body.nome === retornoEsperado.nome); 
                assert(res.body.clima === retornoEsperado.clima);
                assert(res.body.terreno === retornoEsperado.terreno); 
                assert(res.body.participacoes === retornoEsperado.participacoes); 
                done()
            }); 
    })

}); 