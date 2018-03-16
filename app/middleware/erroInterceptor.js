const safira = require('safira');

class ErroInterceptor{
    constructor(app,logger){
        this._app = app; 
        this._logger = logger; 
    }

    created(){
        this._app.use(this._intercept.bind(this));
    }

    _intercept(error,req,res,next){
        
        this._logger.error(error);

        if(this._idMalFormatado(error)){
            res.sendStatus(404); 
            return; 
        }

        res.sendStatus(500); 
    }

    _idMalFormatado(error){
        return error.name == 'CastError' && error.kind == 'ObjectId'; 
    }
}

safira.define(ErroInterceptor)
        .build()
        .eager(); 