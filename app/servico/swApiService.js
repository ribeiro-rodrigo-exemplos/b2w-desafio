const safira = require('safira'); 
const fetch = require('node-fetch'); 

class SwApiService{

    constructor(config,logger){
        this._logger = logger; 
        this._url = config.swApi.host; 

        this._configRequest = {
            timeout: config.swApi.timeout,
            headers:{Accept:'application/json'}
        };  
    }

    obterParticipacoesDoPlanetaEmFilmes(nomeFilme){
        this._logger.info(`Obtendo participações do planeta no filme ${nomeFilme}`); 

        return fetch(`${this._url}/planets?search=${nomeFilme}`,this._configRequest)
                    .then(res => res.json())
                    .then(body => body.results.reduce((quantidade,planeta) => quantidade + planeta.films.length,0))
    }
}

safira.define(SwApiService); 