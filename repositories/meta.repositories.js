const metaSchema = require('../schemas/meta.schema');

const setMetaRepo = async function(metaData){
    return await metaSchema.create(metaData);
}

const getMetaRepo = async function(query={}){
   return await metaSchema.findOne(query);
}

const getMetaByIdRepo = async function(id) {
    return await metaSchema.findById(id).exec();
}

module.exports = {
    setMetaRepo,
    getMetaRepo,
    getMetaByIdRepo
}