const express = require('express')
const app = express();
const fs = require('fs');
const http = require('http');
const assert = require('assert');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

var upload = multer({ storage: storage, limits: {fileSize: 1024 * 1024 * 5}});

const Project = require(__dirname + '/src/js/project.js');
var router = express.Router();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use('/', router);

app.use('/uploads', express.static('uploads'));

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

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/src/about.html');
})

app.get('/home', function (req, res) {
    res.sendFile(__dirname + '/src/index.html');
})

app.get('/admin/panel', function (req, res) {
    res.sendFile(__dirname + '/src/admin/panel.html');
})

app.get('/get-data', function (req, res, next) {
    
    Project.find().lean().exec()
    .then(docs => {
        //console.log(docs);
        //res.json({items: docs}).status(200);
        //return res.end(JSON.stringify(docs));
        res.json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });

    
    app.use('/', router);
    //res.sendFile(__dirname + '/src/portfolio.html');
})

router.get('/portfolio', function (req, res, next) {
    res.sendFile(__dirname + '/src/portfolio.html');
})

app.post('/insert', upload.single('file'), function(req, res){
    const project = new Project({
        projectName: req.body.title,
        description: req.body.description,
        githubLink: req.body.github,
        imageLink: req.file.path
    });

    project.save().then(result => {
        console.log(result);
        res.status(200).json({result});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})

app.patch('/:projectTitle', function (req, res) {
    const title = req.params.projectTitle;
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Project.update({projectName: title}, { $set: updateOps}).exec().then(result => {
        console.log(result);
        res.status(200).json({result});
    }).catch(err => {
        console.log(err);
        res.status(200).json({error: err});
    });
})

app.delete('/:projectTitle', function (req, res) {
    const title = req.params.projectTitle;
    Project.remove({projectName: title}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
        
    });
})
 
app.listen(3000)



