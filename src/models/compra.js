const mongoose = require('mongoose')


const compraSchema= new mongoose.Schema({

    id_usuario:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Usuario'
    },
    id_curso:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Curso'
    }
}, { timestamps: true }
)

compraSchema.statics.findCompras = async (id_usuario) => {
    const compras = await Compra.find({ id_usuario })
    return compras
}

const Compra=mongoose.model('Compra',compraSchema)

module.exports=Compra