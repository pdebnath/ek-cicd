var express = require('express');
var router = express.Router();
var excuteQuery=require('./../../config/mysqldatasource');
var logger = require('./../../config/logger');

  /* Below code is used for getting claimed properties details)*/
  router.post('/getClaimedProperties', function(req, res) {
        excuteQuery(function(conn,err){
          logger.info('getClaimedProperties POST Request Started');
          logger.info('call sp_select_homeowner_claimed_properties(%s)',req.body.userId);
          conn.query('call sp_select_homeowner_claimed_properties(?);',[req.body.userId],function(err,rows){
            conn.release();
            if(err){
              logger.error('Exception while fetching claimed properties :'+err);
              return res.json({status:0,resp:'Exception while fetching claimed properties :'+err}) 
            }
            logger.info('getClaimedProperties POST Request Ended');
            return  res.json({status:1,resp:rows[0]});
          });
        })
  });
  /* Below code is used to fetch deal conversions for particular property)*/
  router.post('/getClaimedPropertiesDeals', function(req, res) {
        excuteQuery(function(conn,err){
          logger.info('getClaimedPropertiesDeals POST Request Started');
          logger.info('call sp_select_home_owner_deals(%s)',req.body.propertyId);
          conn.query('call sp_select_home_owner_deals(?);',[req.body.propertyId],function(err,rows){
            conn.release();
            if(err){
              logger.error('Exception while fetching claimed property deals :'+err);
              return res.json({status:0,resp:'Exception while fetching claimed property deals :'+err}) 
            }
            logger.info('getClaimedPropertiesDeals POST Request Ended');
            return  res.json({status:1,resp:rows[0]});
          });
        })
  });
   /* Below code is used to fetch deal conversions for particular property)*/
  router.post('/dealStatusUpdate', function(req, res) {
        excuteQuery(function(conn,err){
          logger.info('dealStatusUpdate POST Request Started');
          logger.info('call sp_update_homeowner_deal_status(%s,%s,%s)',req.body.dealStatus,req.body.currentDealStatusId,req.body.propertyDealId);
          conn.query('call sp_update_homeowner_deal_status(?,?,?);',[req.body.dealStatus,req.body.currentDealStatusId,req.body.propertyDealId],function(err,rows){
            conn.release();
            if(err){
              logger.error('Exception while updating deal status :'+err);
              return res.json({status:0,resp:'Exception while fetching claimed property deals :'+err}) 
            }
             logger.info('dealStatusUpdate POST Request Ended');
            return  res.json({status:1,resp:rows[0]});
          });
        })
  });
module.exports = router;