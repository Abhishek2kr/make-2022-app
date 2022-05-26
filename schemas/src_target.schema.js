const mongoose = require('mongoose');

const src_targetSchema = new mongoose.Schema({
    metaId: String,
    source_file_path: String,
    mappings: []
})

module.exports = new mongoose.model('src_target', src_targetSchema);
