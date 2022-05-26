const src_targetSchema = require('../schemas/src_target.schema');

const setSrc_targetRepo = function(src_targetData){
    return src_targetSchema.create(src_targetData);
}

const getSrc_targetRepo = function(query={}){
   return src_targetSchema.find(query);
}

module.exports = {
    setSrc_targetRepo,
    getSrc_targetRepo
}