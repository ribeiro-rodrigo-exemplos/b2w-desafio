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

    }

    removerPlaneta(req,res){
        
    }
}

safira.define(PlanetaController); 

