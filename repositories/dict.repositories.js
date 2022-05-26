const dictSchema = require('../schemas/dict.schema');

const setDictRepo = function(dictData){
    return dictSchema.create(dictData);
}

const getDictRepo = function(query=[]){
   return dictSchema.aggregate(query);
}

module.exports = {
    setDictRepo,
    getDictRepo
}