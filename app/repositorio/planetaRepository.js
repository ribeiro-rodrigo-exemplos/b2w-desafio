const safira = require('safira'); 

class PlanetaRepository{

    constructor(planeta){
        this._Planeta = planeta;
    }

    listarPlanetas(){
        return this._Planeta.find(); 
    }

    obterPlanetaPorId(id){
        return this._Planeta.findById(id); 
    }

    removerPlaneta(id){
        return this._Planeta.remove({_id:id}); 
    }

    adicionarPlaneta(planeta){
        return new this._Planeta(planeta).save(); 
    }
}

safira.define(PlanetaRepository); 