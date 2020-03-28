const knex = require('knex');
const config = require('../../knexfile');
const conn = knex(config.development); //Cria a conexão usando as configurações de developtment do arquivo knexfile.js

module.exports = conn;