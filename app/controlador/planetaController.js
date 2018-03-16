const safira = require('safira'); 

class PlanetaController{

    constructor(planetaRepository){
        this._planetaRepository = planetaRepository; 
    }

    listarPlanetas(req,res){

        this._planetaRepository
                .listarPlanetas()
                .then(planetas => planetas.length ? res.json(planetas) : res.sendStatus(204)); 

    }

    criarPlaneta(req,res){

    }

    obterPlanetaPorId(req,res){

        this._planetaRepository
                .obterPlanetaPorId(req.params.id) 
                .then(planeta => planeta ? res.json(planeta) : res.sendStatus(404)); 
    }

    removerPlaneta(req,res){
        
        this._planetaRepository
                .removerPlaneta(req.params.id)
                .then(() => res.sendStatus(204)); 
    }
}

safira.define(PlanetaController); 

