const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    projectName: String,
    description: String,
    githubLink: String,
    imageLink: String
});

module.exports = mongoose.model('Project', projectSchema);