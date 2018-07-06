const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var monk = require('monk');
var db = monk('localhost:27017/tagup');
var api = require('./routes/api');

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use(bodyParser.json());
app.use('/api', api);

app.get('/', (req, res) => res.send('Tagup'));

app.listen(3007, () => console.log('App listening on port 3007'));

