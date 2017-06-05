var express = require('express');
var request = require('request');
var searchRouter = express.Router();
var excuteQuery = require('./../../config/mysqldatasource');
var logger = require('./../../config/logger');

/* Below code is used for getting properties details by Address)*/
searchRouter.post('/getPropertiesDetailsByAddress', function (req, res) {
    var address = req.body.address;
    console.log(address);
    request('https://qvm.quantarium.com/QDataService/QueryPropertiesByAddress?u=EasyKnockTest&k=pda-fb5O6ACu9QzW%23fbV&citystate_zip=' + address, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Print the google web page.
            return res.json({ status: 1, resp: body });
        }
    })
});

/* Below code is used for getting properties details by Latlng)*/
searchRouter.post('/getPropertiesDetailsByLatlng', function (req, res) {
    var latlng = req.body.latlng;
    console.log(req.body);
    request('https://qvm.quantarium.com/QDataService/QueryPropertiesByAddress?u=EasyKnockTest&k=pda-fb5O6ACu9QzW%23fbV&citystate_zip=29582', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Print the google web page.
            //var propertiesData = getAdditionalPropertyInfo(body);
            return res.json({ status: 1, resp: body });
        }
    })
});

getAdditionalPropertyInfo = function(propertiesJson) {
    var propertiesData = [];
    propertiesJson.forEach(function (property) {
        logger.info(property.id);
        excuteQuery(function (conn, err) {
            conn.query('call xxxxxxxxxxxxxxxxxxxx(?,?);', [element.id, element.address, 10000, 2, 9999, 1], function (err, rows) {
                conn.release();
                if (err) {
                    logger.error('Exception while contact to homeowner :' + err);
                }
            });
        })
    });
}

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
            return res.json({ status: 1, resp: 'Success' });
        });
    })
});

/* Below code is used for retrieving favorite count of user)*/
searchRouter.post('/getFavoriteCount', function (req, res) {
    excuteQuery((conn, err) => {
        return conn.query('call sp_select_user_favorites_count(?)', [req.body.userId], function (err, rows) {
            conn.release();
            if (err) {
                logger.error('Exception while fetching user favorite count :' + err);
                return res.json({ status: 0, resp: 'Exception while fetching user favorite count :' + err })
            }
            return res.json({ status: 1, resp: rows[0] });
        });
    });
});

/* Below code is used for get favorites)*/
searchRouter.post('/getFavorites', function (req, res) {
    excuteQuery((conn, err) => {
        return conn.query('call sp_select_user_get_favories(?)', [req.body.userId], function (err, rows) {
            conn.release();
            if (err) {
                logger.error('Exception while fetching user favorites :' + err);
                return res.json({ status: 0, resp: 'Exception while fetching user favorites:' + err })
            }
            return res.json({ status: 1, resp: rows[0] });
        });
    });

});

/* Below code is used for saving favorite property)*/
searchRouter.post('/saveFavoriteProperty', function (req, res) {
    excuteQuery((conn, err) => {
        return conn.query('call sp_insert_or_update_user_favorite_property(?,?,?,?,?,?)', [
            req.body.userId,
            req.body.quantariumId,
            req.body.address,
            req.body.propertyValue,
            req.body.mode,
            0
        ], function (err, rows) {
            conn.release();
            if (err) {
                logger.error('Exception while fetching user favorite count :' + err);
                return res.json({ status: 0, resp: 'Exception while fetching user favorite count :' + err })
            }
            return res.json({ status: 1, resp: rows[0] });
        });
    });

});

/* Below code is used for remove favorite property)*/
searchRouter.post('/removeFavoriteProperty', function (req, res) {
    excuteQuery((conn, err) => {
        return conn.query('call sp_insert_or_update_user_favorite_property(?,?,?,?,?,?)', [
            req.body.userId,
            null,
            null,
            null,
            req.body.mode,
            req.body.propertyId
        ], function (err, rows) {
            conn.release();
            if (err) {
                logger.error('Exception while removing favorite property :' + err);
                return res.json({ status: 0, resp: 'Exception while removing favorite property :' + err })
            }
            return res.json({ status: 1, resp: rows[0] });
        });
    });

});

module.exports = searchRouter;