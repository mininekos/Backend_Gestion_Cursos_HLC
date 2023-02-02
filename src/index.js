const express=require('express')
require('./db/mongoose')

const cursoRouter= require('./routes/curso')
const usuarioRouter= require('./routes/usuario')

const app=express()
const puerto = process.env.PORT || 3000

app.use(express.json())
app.use(cursoRouter)
app.use(usuarioRouter)

app.listen(puerto, () => {
    console.log('Servidor escuchando en el puerto => ' + puerto)
})