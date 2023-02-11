const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const config = require('../config.js');

const properties = require('./components/property/property.network');

const errors = require('../network/error')
const app = express();

app.use(bodyParser.json());


app.use(cors());//urls permitidas para correr sin bloquear

// ROUER
app.use('/api/property', properties);

app.use(errors)
app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});
// this folders for this application will be used to store public file images
app.use('/uploads', express.static(path.resolve('uploads')));