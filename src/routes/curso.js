const express = require('express')
const Curso = require('../models/curso')
const auth = require('../middleware/autentificar')
const router = new express.Router()

router.post('/curso/crear', auth , async(req,res)=>{
    const curso = new Curso(req.body)

    try {
        await curso.save()
        res.status(201).send(curso) 
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/curso/verUno/:id',auth ,async (req,res)=>{

    const _id=req.params.id

    try {
        const curso=await Curso.findById(_id)
        if(!curso){
            return res.status(404).send()
        }
        res.status(200).send(curso)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/curso/verTodosCreados/:id',async (req,res)=>{

    try{
        id= mongoose.Types.ObjectId(req.params.id)
        const cursos=await Curso.find({id_usuario: id})
        res.send(cursos)

    } catch(e){
        res.send(e)
    }
})

router.get('/curso/verTodos',async (req,res)=>{

    try{
        const cursos=await Curso.find({})
        res.send(cursos)

    } catch(e){
        res.send(e)
    }
})

router.patch('/modificarcurso/:id', async(req,res)=>{
    // Hago las comparaciones necesarias para los campos obligatorios
    const actualizaciones= Object.keys(req.body)
    const comparar=['nombre','descripcion']
    const operacionValida=actualizaciones.every((actualizacion)=>comparar.includes(actualizacion))

    if(!operacionValida){
        return res.status(400).send({ error: 'Actualizacion no valida' })
    }

    try {
        const curso=await Curso.findByIdAndUpdate(req.params.idreq.body, { new: true, runValidators: true })
        if(!curso){
            return res.status(404).send()
        }
        res.send(curso)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.delete('/eliminarcurso/:id', async (req,res)=>{

    try {
        const curso=await Curso.findByIdAndDelete(req.params.id)
        if(!curso){
            return res.status(404).send()
        }
        res.send(curso)
    } catch (error) {
        res.status(500).send(error)
    }

})

module.exports = router