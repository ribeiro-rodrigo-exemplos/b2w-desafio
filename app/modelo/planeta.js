const mongoose = require('mongoose'); 
const safira = require('safira'); 

const planetaSchema = mongoose.Schema({
    nome: String, 
    clima: String, 
    terreno: String, 
    participacoes: Number 
},{versionKey:false}); 

const planeta = mongoose.model('Planeta',planetaSchema); 

safira.defineObject(planeta,'planeta'); 