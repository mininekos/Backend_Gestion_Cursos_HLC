const mongoose = require('mongoose')
const validator = require('validator')
const dniValidator= require('dni-js-validator')
const bcrypt = require('bcryptjs')
const jsonWT = require('jsonwebtoken')

const UsuarioSchema=new mongoose.Schema({

    name:{
        type:String,
        required: true
    },
    dni:{
        type:String,
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
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email no valido')
            }
        }
    },
    tlf:{
        type:String,
        validate(value){
            if(!validator.isMobilePhone(value,'es-ES')){
                throw new Error('tlf no valido')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('contraseña')) {
                throw new Error('Contraseña no puede contener "contraseña"')
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
}, { timestamps: true }
)


UsuarioSchema.methods.toJSON= function(){
    const usuario=this
    const usuarioOnject= usuario.toObject()

    delete usuarioOnject.password
    delete usuarioOnject.dni
    delete usuarioOnject.tokens
    delete usuarioOnject.__v


    return usuarioOnject
}

//Crear metodos necesarios para comprobar al usuario

//1.- Generar token de sesion
UsuarioSchema.methods.generateAuthToken= async function(){
    const usuario=this
    const token = jsonWT.sign({_id: usuario._id.toString()},'palabraSecreta123')

    usuario.tokens= usuario.tokens.concat({token})
    await usuario.save()

    return token
}


//2.- Comprobar si el usuario existe
UsuarioSchema.statics.findByCredentials = async (email, password) => {
    const usuario = await Usuario.findOne({email})

    if (!usuario) {
        throw new Error('Email no registrado')
    }

    const coincide = await bcrypt.compare(password, usuario.password)

    if (!coincide) {
        throw new Error('Contraseña incorrecta')
    }

    return usuario
}
//comprobar la contraseña para encriptarla
UsuarioSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const Usuario = mongoose.model('Usuario',UsuarioSchema)

module.exports= Usuario