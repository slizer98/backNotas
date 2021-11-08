import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';


const app = express();
const uri = 'mongodb://localhost:27017/emvr-proyecto-express';

const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// conexion a la base de datos
mongoose.connect(uri, option).then( 
    () => {
    console.log('Conexion a la base de datos establecida');
    },
    err => {
    console.log(err);
    }
)

// Middlewere
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Rutas
app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.use('/api', require('./routes/notas'));

// Middleware para vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

// Puerto
app.set('puerto', process.env.PORT || 3000)

app.listen(app.get('puerto'), () =>{
    console.log(`Escucnado en el puerto: ${app.get('puerto')}`);
});