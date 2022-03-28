'use strict'

// crear servidor web NodeJS y express

//Requires
const express = require('express');
const bodyParser = require('body-parser');

//Ejecutar express
const app = express();

//Cargar archivos de rutas
const notice_routes = require('./src/routes/notice.route')



// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Reescribir rutas
app.use('/api', notice_routes);




// Exportar modulo
module.exports = app;