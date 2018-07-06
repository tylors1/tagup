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

// curl -i -X PUT -H "Content-Type: application/json" -d "{\"timestamp\": \"2018-07-06T00:56:33.631Z\",\"value1\": \"vaue11\",\"value2\": \"value22\",\"value3\": \"value33\"}" http://tylorsarrafzadeh.com/tagup/api/modify/5b3ed0d2f9abfe6e40735fea
// curl -i -X PUT -H "Content-Type: application/json" -d "{\"timestamp\": \"2018-07-06T00:56:33.631Z\",\"value1\": \"vaue11\",\"value2\": \"value22\",\"value3\": \"value33\"}" http://tylorsarrafzadeh.com/tagup/api/modify/:recordId
// curl -i -X PUT -H "Content-Type: application/json" -d "{\"timestamp\": \"2018-07-06T00:56:33.631Z\",\"value1\": \"value11\",\"value2\": \"value22\",\"value3\": \"value33\"}" http://localhost:3007/api/modify

// curl http://localhost:3007/api/list
// curl -i -X POST -H "Content-Type: application/json" -d "{\"timestamp\": \"2018-07-06T00:56:33.631Z\",\"value1\": \"value1\",\"value2\": \"value2\",\"value3\": \"value3\"}" http://localhost:3007/api/create