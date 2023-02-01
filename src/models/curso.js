const mongoose = require('mongoose')
const validator = require('validator')

const Curso=mongoose.model('Curso',{

    nombre:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true,
        maxLength: 100
    }
})

module.exports=Curso