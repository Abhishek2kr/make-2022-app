const metaService = require('../services/meta.service');

const registerMetaController = async(req,res,next) => {
  try {
    console.log(req.body);
     const {columns, name} = req.body;
     if(!columns || !name) return res.status(400).json("Bad request");
     console.log("I am coming");
     const response = await metaService.registerMeta({columns,name});
     return res.json(response);
  } catch (error) {
     next(error);
  }
}

const fetchMetaController = async(req,res,next) => {
  try {
    console.log(req.body);
     const {query} = req.params;
     // if(!query) return res.status(400).json("Bad request");
     console.log("I am coming");
     const response = await metaService.fetchMeta(query);
     console.log(response);
     return res.json(response);
  } catch (error) {
     next(error);
  }
}


const srcTargetMappingController = async(req,res,next) => {
  try {
     console.log(req.body);
     const { metaTableName, containsCol } = req.body;
     console.log(req.body, req.file)
     if(!metaTableName) return res.status(400).json("Bad request");
     const response = await metaService.uploadAndProcessSourceFile(containsCol,metaTableName, req.file);
     return res.json(response);
  } catch (error) {
     console.log(error);
     next(error);
  }
}



module.exports = {
  registerMetaController,
  fetchMetaController,
  srcTargetMappingController
}