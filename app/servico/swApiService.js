const safira = require('safira'); 
const fetch = require('node-fetch'); 

class SwApiService{

    constructor(config){
        this._url = config.swApi; 
        this._configRequest = {
            headers:{Accept:'application/json'}
        };  
    }

    obterParticipacoesDoPlanetaEmFilmes(nomeFilme){
        console.log(`${this._url}/planets?search=${nomeFilme}`)
        return fetch(`${this._url}/planets?search=${nomeFilme}`,this._configRequest)
                    .then(res => res.json())
                    .then(body => body.results.reduce((quantidade,planeta) => quantidade + planeta.films.length,0))
    }
}

safira.define(SwApiService); 