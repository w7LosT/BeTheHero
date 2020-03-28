const express = require('express');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');
// const crypto = require('crypto');
// const conn = require('./database/connection');
const routes = express.Router();
/*
    ROTA -> Caminho até um recurso
    RECURSO -> Está relacionado a uma funcionalidade, como listagem de usuário por exemplo
*/

/*
    MÉTODOS HTTP

    GET -> usado para buscar uma informação no backend
    POST -> usado para criar informações para o backend
    PUT -> usado para alterar informações no backend
    DELETE -> usado para deletar informações no backend
*/


/*
    TIPOS DE PARÂMETROS

    QUERY -> usado para filtros e paginações
    ROUTER PARAMS -> usados para identificar recursos. Ex.: /users/:id, url: localhost:3333/users/1 vai buscar o usuário de id 1
    REQUEST BODY -> parâmetros enviados na request para criar ou alterar recursos. Ex.: localhost:3333/users?nome=lucas
*/

/*
    COMUNICAÇÃO COM BANCO DE DADOS

    DRIVER: SELECT * FROM users; Nesse caso, precisa de um driver para cada banco
    QUERY BUILDER: table('users').select('*').where(); Nesse caso, pode usar qualquer banco, o mais famoso query builder é o KNEX.JS
*/

// routes.post('/users', (request, response) => {
//     console.log("teste");
//     // const routerparams = request.params; //armazena todos os router params
//     const requestbody = request.body; //armazena todas os request body
//     console.log(requestbody);
//     // console.log(routerparams);
//     return response.json({
//         nome : "teste",
//         idade : "teste"
//     });
// });

// routes.get('/ongs/:id', async (request, response) => {
//     const id = request.params.id;
//     const ong = await conn('ongs').select('*').where({"id" : id});
//     return response.json({ong});
// });

routes.get('/ongs/:id', ongController.index);

routes.post('/ongs', ongController.create);

routes.get('/incidents', incidentController.index);

routes.post('/incidents', incidentController.create);

routes.delete('/incidents/:id', incidentController.delete);

routes.get('/profile', profileController.index);

routes.post('/session', sessionController.create);

// routes.post('/ongs', async (request, response) => {
//     const {name, email, whatsapp, city, uf} = request.body;
//     const id = crypto.randomBytes(4).toString('HEX'); //Gera 4 caracteres hexadecimais
//     //O await fará com que a aplicação espere que o método insert seja finalizado
//     await conn('ongs').insert({
//        id, name, email, whatsapp, city, uf, 
//     });
//     // console.log(data);
//     return response.json({
//         id : id
//     });
// });

module.exports = routes;