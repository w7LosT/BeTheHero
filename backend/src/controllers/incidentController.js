const conn = require('../database/connection');
module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;
        const [qtdIncidents] = await conn('incidents').count();
        response.header('X-Total-Count', qtdIncidents['count(*)']);
        const incidents = await conn('incidents')
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5);

        return response.json({
            incidents
        });
    },

    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await conn('incidents').insert({
            title, description, value, ong_id
        });
        return response.json({
            id
        });
    },

    async delete(request, response){
        const incident_id = request.params.id;
        console.log(incident_id);
        const ong_id = request.headers.authorization;
        const incident = await conn('incidents').select('ong_id').where({"id" : incident_id}).first();
        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation Not Allowed.'});
        }

        await conn('incidents').where("id", incident_id).delete();
        return response.status(204).send();
    } 
}