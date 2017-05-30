var express = require('express');
var request = require('request');
var searchRouter = express.Router();
var excuteQuery = require('./../../config/mysqldatasource');
var logger = require('./../../config/logger');

/* Below code is used for getting properties details by Address)*/
searchRouter.post('/getPropertiesDetailsByAddress', function (req, res) {
    console.log(req.body);
    request('https://qvm.quantarium.com/QDataService/QueryPropertiesByAddress?u=EasyKnockTest&k=pda-fb5O6ACu9QzW%23fbV&citystate_zip=29582', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Print the google web page.
            return res.json({ status: 1, resp: body });
        }
    })
});

/* Below code is used for getting properties details by Latlng)*/
searchRouter.post('/getPropertiesDetailsByLatlng', function (req, res) {
    console.log(req.body);
    request('https://qvm.quantarium.com/QDataService/QueryPropertiesByAddress?u=EasyKnockTest&k=pda-fb5O6ACu9QzW%23fbV&citystate_zip=29582', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Print the google web page.
            return res.json({ status: 1, resp: body });
        }
    })
});

/* Below code is used for contact to all property/home owners)*/
searchRouter.post('/contactToAllHomeOwners', function (req, res) {
    console.log(req.body);
    return res.json({ status: 1, resp: 'Success' });
});

/* Below code is used for contact to all property/home owners)*/
searchRouter.post('/viewPropertyDetails', function (req, res) {
    console.log(req.body);
    // Code to update the count in viewed property
    // Code to Fetch the Property Details
    return res.json({ status: 1, resp: 'Success' });
});

module.exports = searchRouter;