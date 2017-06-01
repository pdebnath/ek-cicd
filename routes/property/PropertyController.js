var express = require('express');
var request = require('request');
var searchRouter = express.Router();
var excuteQuery = require('./../../config/mysqldatasource');
var logger = require('./../../config/logger');

/* Below code is used for contact to all property/home owners)*/
searchRouter.post('/getPropertiesDetailsByPropertyId', function (req, res) {
    var propertyId = req.body.propertyId;
    console.log(propertyId);
    request('https://qvm.quantarium.com/QDataService/GetPropertyRecords?u=EasyKnockTest&k=pda-fb5O6ACu9QzW%23fbV&id='+propertyId+'&records=all', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Print the google web page.
            return res.json({ status: 1, resp: body });
        }
    })
});

module.exports = searchRouter;