const mongoose = require('mongoose');

const dictSchema = new mongoose.Schema({  
  word: String,
  meaning: String
})

module.exports = new mongoose.model('dict', dictSchema);