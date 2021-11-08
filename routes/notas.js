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

// exportamos el router
module.exports = router;