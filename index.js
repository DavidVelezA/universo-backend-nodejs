'use strict'
// conectar a la base de datos MongoDB
const mongoose = require('mongoose');

// exportar configuracion de express
const app = require('./app');
const port = process.env.PORT || 3999;

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://facci:facci@cluster0-kidus.mongodb.net/db-universo', { useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log('conexion a MongoDB correcta');

        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto: ${port}`);
        });

    })
    .catch(error => console.log(error));