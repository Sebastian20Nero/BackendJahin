const store = require('../../../store/pgdb'); 
const controlador = require('./property.controller');

module.exports = controlador(store);