const express = require('express')
const Curso = require('../models/curso')
const router = new express.Router()

router.post('/cursos', async(req,res)=>{
    const curso = new Curso(req.body)

    try {
        await curso.save()
        res.status(201).send(curso) 
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/cursos/:id',async (req,res)=>{

    try {
        const curso=await Curso.findById(req.param.id)
        if(!curso){
            return res.status(404).send()
        }
    } catch (error) {
        res.status(500).send.error
    }
})

router.patch('/curso/:id', async(req,res)=>{
    // Hago las comparaciones necesarias para los campos obligatorios
    const actualizaciones= Object.keys(req.body)
    const comparar=['nombre','descripcion']
    const operacionValida=actualizaciones.every((actualizacion)=>comparar.includes(actualizacion))

    if(!operacionValida){
        return res.status(400).send({ error: 'Actualizacion no valida' })
    }

    try {
        const curso=await Curso.findByIdAndUpdate(req.param.idreq.body, { new: true, runValidators: true })
        if(!curso){
            return res.status(404).send()
        }
        res.send(curso)
    } catch (error) {
        res.status(500).send.error
    }

})

router.delete('/cursos/:id', async (req,res)=>{

    try {
        const curso=await Curso.findByIdAndDelete(req.param.id)
        if(!curso){
            return res.status(404).send()
        }
        res.send(curso)
    } catch (error) {
        res.status(500).send.error
    }

})

module.exports = router