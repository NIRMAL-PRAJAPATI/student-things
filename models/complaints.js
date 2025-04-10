const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/databases`);

const data = mongoose.Schema({
    username: String,
    subject: String,
    message: String,
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('complaint', data);