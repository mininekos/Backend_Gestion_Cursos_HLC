const express = require('express')
const Usuario = require('../models/usuario')
const auth = require('../middleware/autentificar')
const router = new express.Router()

router.post('/usuario/crear', async(req,res)=>{
    const usuario = new Usuario(req.body)

    try {
        await usuario.save()
        res.status(201).send(usuario) 
    } catch (error) {
        res.status(400).send(error)
    }

})
router.post('/usuario/login',async (req,res)=>{
    try {
        const usuario = await Usuario.findByCredentials(req.body.email, req.body.password)
        const token = await usuario.generateAuthToken()
        res.send({ usuario, token })
    } catch (error) {
        res.status(400).send.error
    }
})

router.get('/usuario/me', auth, async (req,res)=>{
    res.send(req.usuario)
})

router.post('/usuario/logout', auth, async (req,res)=>{
    try {
        req.usuario.tokens = req.usuario.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.usuario.save()

        res.send()
    } catch (error) {
        res.status(500).send.error
    }
})

router.patch('/usuario/actualizar', auth, async(req,res)=>{
    // Hago las comparaciones necesarias para los campos obligatorios
    const actualizaciones= Object.keys(req.body)
    const comparar=['name','dni','email','tlf','password']
    const operacionValida=actualizaciones.every((actualizacion)=>comparar.includes(actualizacion))
    
    if(!operacionValida){
        return res.status(400).send({ error: 'Actualizacion no valida' })
    }

    try {
        actualizaciones.forEach((actu)=>req.usuario[actu]=req.body[actu])
        await req.usuario.save()
        res.send(req.usuario)
    } catch (error) {
        return res.status(400).send()
    }

})

router.delete('/usuario/eliminar', auth, async (req,res)=>{

    try {
        await req.usuario.remove()
        res.send(req.usuario)
    } catch (error) {
        res.status(500).send.error
    }

})

module.exports = router