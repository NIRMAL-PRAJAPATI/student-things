const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/databases`);

const data = mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    birthdate: String,
    image: {
        type: String,
        default: "defult.png",
    },
    joining: {
        type: Date,
        default: Date.now,
    },
    username: String,
    password: String,
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects'
      }],
})

module.exports = mongoose.model('users', data);