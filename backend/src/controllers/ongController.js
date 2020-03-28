const crypto = require('crypto');
const conn = require('../database/connection');

module.exports = {

    async index(request, response) {
        const id = request.params.id;
        const ong = await conn('ongs').select('*').where({"id" : id});
        return response.json({ong});
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX'); //Gera 4 caracteres hexadecimais
        //O await fará com que a aplicação espere que o método insert seja finalizado
        await conn('ongs').insert({
        id, name, email, whatsapp, city, uf, 
        });
        // console.log(data);
        return response.json({
            id : id
        });
    }
}