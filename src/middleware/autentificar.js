const User = require('../models/usuario')
const jsonWT = require('jsonwebtoken')

const autentificar=async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jsonWT.verify(token, 'palabraSecreta123')
        const usuario = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!usuario) {
            throw new Error()
        }

        req.token = token
        req.usuario = usuario
        
        next()
    }catch(e){
        res.status(401).send({error:'Por favor autentificate'})
    }
}

module.exports = autentificar