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
    var propertyData = req.body.key;
    propertyData.forEach(function (element) {
        logger.info(element.id);
        excuteQuery(function (conn, err) {
            conn.query('call sp_contact_to_homeowner(?,?,?,?,?,?);', [element.id, element.address, 10000, 2, 9999, 1], function (err, rows) {
                conn.release();
                if (err) {
                    logger.error('Exception while contact to homeowner :' + err);
                }
            });
        })
    });
});

/* Below code is used for contact to all property/home owners)*/
searchRouter.post('/viewPropertyDetails', function (req, res) {
    var propertyData = req.body.key;    
        logger.info(propertyData.id);
        excuteQuery(function (conn, err) {
            conn.query('call sp_insert_view_property(?,?,?,?);', [propertyData.id, propertyData.address, 10000, 2], function (err, rows) {
                conn.release();
                if (err) {
                    logger.error('Exception while inserting view property :' + err);
                }
                return  res.json({status:1,resp:''});
            });
        })
});

module.exports = searchRouter;