const safira = require('safira'); 

class PlanetaController{

    constructor(planetaRepository,swApiService){
        this._planetaRepository = planetaRepository; 
        this._swApiService = swApiService; 
    }

    listarPlanetas(req,res){

        this._planetaRepository
                .listarPlanetas()
                .then(planetas => planetas.length ? res.json(planetas) : res.sendStatus(204)); 

    }

    adicionarPlaneta(req,res){

        this._swApiService
                .obterParticipacoesDoPlanetaEmFilmes(req.body.nome)
                .then(qtdParticipacoes => req.body.participacoes = qtdParticipacoes)
                .then(() => this._planetaRepository.adicionarPlaneta(req.body))
                .then(planetaAdicionado => {
                    res.setHeader('Location',`/v1/planetas/${planetaAdicionado.id}`); 
                    res.status(201)
                        .json(planetaAdicionado); 
                })
                .catch(error => next(error)); 
    }

    obterPlanetaPorId(req,res,next){

        this._planetaRepository
                .obterPlanetaPorId(req.params.id) 
                .then(planeta => planeta ? res.json(planeta) : res.sendStatus(404))
                .catch(error => next(error)); 
    }

    removerPlaneta(req,res){
        
        this._planetaRepository
                .removerPlaneta(req.params.id)
                .then(() => res.sendStatus(204)); 
    }
}

safira.define(PlanetaController); 

