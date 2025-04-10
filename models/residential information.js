const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/databases`);

const data = mongoose.Schema({
    username: String,
    address: String,
    pincode: Number,
    city: String,
    state: String,
    country: String
})

module.exports = mongoose.model('resinformation', data);