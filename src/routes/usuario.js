const express = require('express')
const Usuario = require('../models/usuario')
const router = new express.Router()

router.post('/crearusuario', async(req,res)=>{
    const usuario = new Usuario(req.body)

    try {
        await usuario.save()
        res.status(201).send(usuario) 
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/buscarusuario/:id',async (req,res)=>{

    try {
        const usuario=await Usuario.findById(req.params.id)
        if(!usuario){
            return res.status(404).send()
        }
    } catch (error) {
        res.status(500).send.error
    }
})

router.patch('/actualizarusuario/:id', async(req,res)=>{
    // Hago las comparaciones necesarias para los campos obligatorios
    const actualizaciones= Object.keys(req.body)
    const comparar=['nombre','dni','email','tlf']
    const operacionValida=actualizaciones.every((actualizacion)=>comparar.includes(actualizacion))

    if(!operacionValida){
        return res.status(400).send({ error: 'Actualizacion no valida' })
    }

    try {
        const usuario=await Usuario.findByIdAndUpdate(req.params.idreq.body, { new: true, runValidators: true })
        if(!usuario){
            return res.status(404).send()
        }
        res.send(usuario)
    } catch (error) {
        res.status(500).send.error
    }

})

router.delete('/eliminarusuario/:id', async (req,res)=>{

    try {
        const usuario=await Usuario.findByIdAndDelete(req.params.id)
        if(!usuario){
            return res.status(404).send()
        }
        res.send(usuario)
    } catch (error) {
        res.status(500).send.error
    }

})

module.exports = router