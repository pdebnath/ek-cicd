var express = require('express');
var router = express.Router();
var excuteQuery=require('./../../config/mysqldatasource');
var logger = require('./../../config/logger');

  /* Below code is used for getting claimed properties details)*/
  router.post('/getClaimedProperties', function(req, res) {
        excuteQuery(function(conn,err){
          logger.info(req.body.userId);
          conn.query('call sp_select_claimed_properties(?);',[req.body.userId],function(err,rows){
            conn.release();
            if(err){
              logger.error('Exception while fetching claimed properties :'+err);
              return res.json({status:0,resp:'Exception while fetching claimed properties :'+err}) 
            }
            return  res.json({status:1,resp:rows[0]});
          });
        })
  });
  /* Below code is used to fetch deal conversions for particular property)*/
  router.post('/getClaimedPropertiesDeals', function(req, res) {
        excuteQuery(function(conn,err){
          logger.info(req.body.userId);
          conn.query('call sp_select_home_owner_deals(?);',[req.body.propertyId],function(err,rows){
            conn.release();
            if(err){
              logger.error('Exception while fetching claimed property deals :'+err);
              return res.json({status:0,resp:'Exception while fetching claimed property deals :'+err}) 
            }
            return  res.json({status:1,resp:rows[0]});
          });
        })
  });
module.exports = router;