import express from 'express';
const router = express.Router();

// imortamos el modelo de notas
import Nota from '../models/notas';

// agregamos una nota
router.post('/nueva-nota', async(req, res) => {
    const body = req.body;
    try{
        const notaDB = await Nota.create(body);
        res.status(200).json(notaDB);
    }catch(error){
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// Obtener las notas de un ID
router.get('/nota/:id', async(req, res) => {
    const _id = req.params.id;

    try{
        const notaDB = await Nota.findOne( { _id } );
        res.json(notaDB);
    }catch(error){
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// obtener todas las notas
router.get('/nota', async(req, res) => {
    try{
        const notaDB = await Nota.find();
        res.json(notaDB);
    }catch(error){
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// Borrar nota mediane ID
router.delete('/nota/:id', async(req, res) => {
    const _id = req.params.id;
    
    try{
        const notaDB = await Nota.findByIdAndDelete({ _id });
        if(!notaDB){
            return res.status(400).json({
                mensaje: 'No se encontro la nota'
            });
        }
        res.json(notaDB);
    }catch(error){
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// Actualizar nota mediante el PUT
router.put('/nota/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;

    try{
        const notaDB = await Nota.findByIdAndUpdate({ _id }, body, { new: true });
        res.json(notaDB);
    }catch(error){
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// exportamos el router
module.exports = router;