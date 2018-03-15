const safira = require('safira'); 

class Runner{
    constructor(app,config){
        this._app = app; 
        this._port = config.server.port; 
    }

    created(){
        this._app.listen(this._port,() => console.log(`Servidor rodando na porta ${this._port}`)); 
    }
}

safira.define(Runner)
        .build()
        .eager(); 