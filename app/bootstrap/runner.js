const safira = require('safira'); 

class Runner{
    constructor(app){
        this._app = app; 
        this._port = 3000; 
    }

    created(){
        this._app.listen(this._port,() => console.log(`Servidor rodando na porta ${this._port}`)); 
    }
}

safira.define(Runner)
        .build()
        .eager(); 