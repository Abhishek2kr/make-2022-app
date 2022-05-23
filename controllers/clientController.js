const {fetchClients, monthWiseData , saveData} = require('../services/clientService');

const clientController = async(req, res) => { 
  try {
    let { page = 1, size=10} = req.query;
    const response = await fetchClients(page,size);
    res.json(response); 
  } catch (error) {
    throw error;
  }
}

const clientMonthWiseInsights = async(req, res) => { 
  try {
    let { region } = req.query;
    const response = await monthWiseData(region);
    res.json(response); 
  } catch (error) {
    throw error;
  }
}

const saveDataController = async(req, res) => { 
  try {
    let { data, page, size } = req.body;
    const response = await saveData(data, page, size);
    res.json(response); 
  } catch (error) {
    throw error;
  }
}

module.exports = {
    clientController,
    clientMonthWiseInsights,
    saveDataController
}