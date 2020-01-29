const express = require('express');


const app = express();
const bodyParser = require('body-parser');
require('./config/config')

//en este modulo se creara el servidor web local del cual se podra hacer las peticiones en el localhost

const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(require('./routes/usuario'));
//se hace la conexion con la base de datos 
// se hace el llamado a la conexion con el modulo config para inicializar la conexion con la base.
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res) => {

        if (err) throw err;

        console.log('Base de datos ONLINE!');
    });
// se inicializa el servidor en el puerto asignado en el módulo config
app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT);
});