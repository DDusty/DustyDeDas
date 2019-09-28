const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    projectName: String,
    description: String,
    githubLink: String,
    imageLink: { type: String, required: true}
});

module.exports = mongoose.model('Project', projectSchema);