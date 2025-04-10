const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/databases`);

const data = mongoose.Schema({
    username: String,
    type: String,
    qualification: String,
    scwname: String,
    skill: String,
    language: String
})

module.exports = mongoose.model('profinformation', data);