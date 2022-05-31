
const mongoose = require('mongoose');

/*
id
version
file_name
source_file_location
target_file_location
*/

/*
 file_id
 source_field
 target_field
 source_field_datatype
 target_field_datatype
*/
const meta = new mongoose.Schema({
    name: {type: String, required: true},
    columns: [],
    target_file_location: String
});

module.exports = new mongoose.model('meta', meta);