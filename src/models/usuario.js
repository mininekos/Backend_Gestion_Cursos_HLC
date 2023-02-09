const mongoose = require('mongoose')
const validator = require('validator')
const dniValidator= require('dni-js-validator')
const bcrypt = require('bcryptjs')

const UsuarioSchema=mongoose.Schema({

    name:{
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
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
    
    

})

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const Usuario = mongoose.model('Usuario',UsuarioSchema)

module.exports= Usuario