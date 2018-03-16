const safira = require('safira'); 

class Runner{
    constructor(app,config){
        this._app = app; 
        this._config = config; 
    }

    created(){

        if(this._config.environment != 'test'){
            const port = this._config.server.port; 
            this._app.listen(port,() => console.log(`Servidor rodando na porta ${port}`)); 
        }
    }
}

safira.define(Runner)
        .build()
        .eager(); 