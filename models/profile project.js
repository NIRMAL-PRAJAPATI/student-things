const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/databases`);

const projects = mongoose.Schema({
    username: String,
    date: {
        type: Date,
        default: Date.now
    },
    title: String,
    discription: String,
    technology: String,
    link: String,
    likes: [{
        type: String,
        ref: 'users'
      }],
});

module.exports = mongoose.model('projects', projects);