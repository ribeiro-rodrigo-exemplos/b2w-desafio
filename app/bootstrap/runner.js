const safira = require('safira'); 

class Runner{
    constructor(app,config,logger){
        this._app = app; 
        this._config = config; 
        this._logger = logger; 
    }

    created(){

        if(this._config.environment != 'test'){
            const port = this._config.server.port; 
            this._app.listen(port,() => this._logger.info(`Servidor rodando na porta ${port}`)); 
        }
    }
}

safira.define(Runner)
        .build()
        .eager(); 