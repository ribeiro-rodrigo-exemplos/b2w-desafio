const request = require('supertest'); 
const assert = require('assert'); 
const safira = require('safira'); 
require('../../app/bootstrap/bootstrap'); 

describe('Testando o controlador planetaController', () => {

    var app; 
    var planetaRepository; 

    before(() => {
        app = safira.bean('app')
        planetaRepository = safira.bean('planetaRepository'); 
    }); 

    it('#Retornando todos os planetas',done => {

        const todosOsPlanetas = [
            {id:1,nome:"Marte",clima:"Semiárido",terreno:"deserto"}, 
            {id:2,nome:"Plutão",clima:"Frio",terreno:"deserto"}, 
            {id:3,nome:"Jupiter",clima:"Desértico",terreno:"deserto"}
        ]

       planetaRepository.listarPlanetas = () => Promise.resolve(todosOsPlanetas);  

       request(app)
            .get('/v1/planetas')
            .expect('Content-Type',/json/)
            .timeout(1000) 
            .expect(200,todosOsPlanetas) 
            .end(done) 

    }); 

    it("#Nenhum planeta retornado",done => {

        planetaRepository.listarPlanetas = () => Promise.resolve([]); 
        
        request(app)
            .get('/v1/planetas')
            .timeout(1000) 
            .expect(204) 
            .end(done)  

    }); 

    it("#Retornando planeta por id",done => {

        const planeta = {nome:"Tatooine",clima:"arid",terreno:"desert",participacoes:5}; 
        planetaRepository.obterPlanetaPorId = () => Promise.resolve(planeta)

        request(app)
            .get('/v1/planetas/1')
            .expect('Content-Type',/json/) 
            .timeout(1000)
            .expect(200)
            .end(done); 
    })

    it("#Planeta não encontrado",done => {

        planetaRepository.obterPlanetaPorId = () => Promise.resolve(null)

        request(app)
            .get('/v1/planetas/1')
            .timeout(1000)
            .expect(404)
            .end(done); 
    })

}); 