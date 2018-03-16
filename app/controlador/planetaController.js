const safira = require('safira'); 

class PlanetaController{

    constructor(planetaRepository,swApiService,logger){
        this._planetaRepository = planetaRepository; 
        this._swApiService = swApiService; 
        this._logger = logger; 
    }

    listarPlanetas(req,res){
        this._logger.info("Listando todos os planetas"); 

        this._planetaRepository
                .listarPlanetas()
                .then(planetas => planetas.length ? res.json(planetas) : res.sendStatus(204)); 
    }

    adicionarPlaneta(req,res,next){
        this._logger.info("Adicionando planeta"); 

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
        this._logger.info(`Obtendo planeta ${req.params.id}`); 

        this._planetaRepository
                .obterPlanetaPorId(req.params.id) 
                .then(planeta => planeta ? res.json(planeta) : res.sendStatus(404))
                .catch(error => next(error)); 
    }

    removerPlaneta(req,res){
        this._logger.info(`Removendo planeta ${req.params.id}`); 
        
        this._planetaRepository
                .removerPlaneta(req.params.id)
                .then(() => res.sendStatus(204))
                .catch(error => next(error)); 
    }
}

safira.define(PlanetaController); 

