const mongoose = require('mongoose')

const cursoSchema= new mongoose.Schema({

    nombre:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true,
        maxLength: 100
    },
    id_usuario:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Usuario'
    },
    precio:{
        type: Number,
        required:true,
        min:0
    }
}, { timestamps: true })

cursoSchema.methods.toJSON = function () {
    const curso = this
    const cursoObject = curso.toObject()
    
    delete cursoObject.__v
    delete cursoObject.id_usuario

    return cursoObject
}

const Curso=mongoose.model('Curso',cursoSchema)
module.exports=Curso