const express= require('express')
const Compra = require('../models/compra')
const auth = require('../middleware/autentificar')
const router = new express.Router()


router.post('/compra/crear',auth, async (req, res) => {
    const compra = new Compra(req.body)
    try{
        await compra.save()
        res.status(201).send(compra)
    }catch(e){

    }

})

module.exports = router