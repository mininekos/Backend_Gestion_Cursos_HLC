const mongoose = require('mongoose')
const validator = require('validator')
const dniValidator= require('dni-js-validator')

const Usuario=mongoose.model('Usuario',{

    nombre:{
        type:String,
        required: true
    },
    dni:{
        type:String,
        required: true,
        lowercase: true,
        validate(value){
            if(!dniValidator.isValid(value)){
                throw new Error('DNI no valido')
            }
           
        }
    },
    email:{
        type:String,
        required: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email no valido')
            }
        }
    },
    tlf:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isMobilePhone(value,'es-ES')){
                throw new Error('tlf no valido')
            }
        }
    }

})

module.exports= Usuario