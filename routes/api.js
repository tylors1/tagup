var express = require('express');
var router = express.Router();
var moment = require('moment');

/*
 * GET all records.
 */
router.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('records');
    collection.find({},'-_id -creationDate -lastModificationDate', function(err, result){
        res.json(
            (err === null) ? result : err
        );
    });
});

/*
 * GET one record with id.
 */
router.get('/read/:recordId', function(req, res) {
    var db = req.db;
    var collection = db.get('records');
    collection.findOne({_id: req.params.recordId}, '-_id -creationDate -lastModificationDate', function(err, result){
        res.json(
            (err === null) ? result : err
        );
    });
});

/*
 * POST to create record.
 */
router.post('/create', function(req, res) {
    var db = req.db;
    var collection = db.get('records');
    newRecord = req.body;
    var date = moment(req.body.timestamp);
    if (!date.isValid()){
        res.send("Error - Invalid date format for 'timestamp'");
    }
    else {
        currentDate = new Date();
        newRecord['creationDate'] = currentDate;
        newRecord['lastModificationDate'] = currentDate;

        collection.insert(newRecord, function(err, result){
            console.log(result);
            res.json(
                (err === null) ? 'Record successfully created' : err
            );
        });
    }
});

/*
 * PUT to modify record.
 */
router.put('/modify/:recordId', function(req, res) {
    var db = req.db;
    var collection = db.get('records');
    newRecord = req.body;
    // Remove keys to not be modified. MongoDB does not allow _id to be modified.
    delete newRecord["creationDate"];
    currentDate = new Date();
    newRecord['lastModificationDate'] = currentDate;

    collection.update({"_id": req.params.recordId}, {$set: newRecord}, function(err, result){
        res.json(
            (err === null) ? 'Record successfully modified' : err
        );
    });
});

/*
 * DELETE to record.
 */
router.delete('/remove/:recordId', function(req, res) {
    var db = req.db;
    var collection = db.get('records');
    collection.remove({'_id': req.params.recordId}, function(err, result) {
        res.json(
            (err === null) ? 'Record successfully deleted' :  err
        );
    });
});

module.exports = router;