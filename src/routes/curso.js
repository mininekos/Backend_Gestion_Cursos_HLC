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

router.get('/curso/verTodosCreados',auth,async (req,res)=>{

    try{
        const cursos=await Curso.find({id_usuario: req.usuario._id})
        res.send(cursos)

    } catch(e){
        res.status(500).send(e)
    }
})

router.get('/curso/verTodos', auth, async (req,res)=>{

    try{
        const cursos=await Curso.find({})
        res.send(cursos)

    } catch(e){
        res.send(e)
    }
})

router.get('/curso/verTodosDemas', auth, async (req,res)=>{


    try{
        const cursos=await Curso.find({id_usuario: {$ne: req.usuario._id}})
        .populate('id_usuario', 'name').exec(
            (err,cursos)=>{
                if(err){
                    console.log(err)
                }
                else{
                    res.send(cursos)
                }
            });
        
        

    } catch(e){
        res.status(500).send(e)
    }
})

router.patch('/modificarcurso/:id', auth, async(req,res)=>{
    // Hago las comparaciones necesarias para los campos obligatorios
    const actualizaciones= Object.keys(req.body)
    const comparar=['nombre','descripcion','precio']
    const operacionValida=actualizaciones.every((actualizacion)=>comparar.includes(actualizacion))

    if(!operacionValida){
        return res.status(400).send({ error: 'Actualizacion no valida' })
    }

    try {
        const curso=await Curso.findById({_id:req.params.id, id_usuario: req.usuario._id})
        if(!curso){
            return res.status(404).send()
        }
        actualizaciones.forEach((actu)=>curso[actu]=req.body[actu])
        await curso.save()
        res.send(curso)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.delete('/eliminarcurso/:id', auth, async (req,res)=>{

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