const express = require('express')
const app = express()
const http = require('http');
const assert = require('assert');
const Project = require(__dirname + '/src/js/project.js');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(express.static('public'));
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.sendFile(__dirname + '/index.html');
});

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Dusty:' + process.env.MONGO_ATLAS_PW + '@dustydb-q49hz.azure.mongodb.net/Dustydedas?retryWrites=true&w=majority', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected');
});

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/src/index.html');
})

app.get('/portfolio', function (req, res) {
    res.sendFile(__dirname + '/src/portfolio.html');
})

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/src/about.html');
})

app.get('/home', function (req, res) {
    res.sendFile(__dirname + '/src/index.html');
})

app.get('/admin/panel', function (req, res) {
    res.sendFile(__dirname + '/src/admin/panel.html');
})

app.post('/insert', function(req, res){
    const project = new Project({
        projectName: req.body.title,
        description: req.body.description,
        githubLink: req.body.github,
        imageLink: ''
    });

    project.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
})

app.post('/update', function (req, res) {
    
})

app.post('/delete', function (req, res) {
    
})
 
app.listen(3000)



