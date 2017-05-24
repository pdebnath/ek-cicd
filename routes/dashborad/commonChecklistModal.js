let express = require('express');
let router = express.Router();
let logger = require('./../../config/logger');
let excuteQuery=require('./../../config/mysqldatasource');


router.post('/modal/details',  (req ,res) => {
   console.log(req.body.userType)
       excuteQuery((conn,err) => {
        let userType = req.body.userType;
	   return conn.query('call sp_select_checklist_bytype(?)',[userType],function(err,rows){
            conn.release();
            if(err){
              logger.error('Exception while fetching claimed properties :'+err);
              return res.json({status:0,resp:'Exception while fetching claimed properties :'+err}) 
            }
            return  res.json({status:1,resp:rows[0]});
          });
	   });

})
router.post('/modal/details/sequence',  (req ,res) => {
       excuteQuery((conn,err) => {
   
     
	   return conn.query('call sp_select_checklist_sequence_bystatus(?,?)',[req.body.currentStatusId,req.body.userType],function(err,rows){
            conn.release();
            if(err){
              logger.error('Exception while fetching claimed properties :'+err);
              return res.json({status:0,resp:'Exception while fetching claimed properties :'+err}) 
            }
            return  res.json({status:1,resp:rows[0]});
          });
	   });



})
router.post('/modal/details/update',  (req ,res) => {
       excuteQuery((conn,err) => {
   
     
    
     let userType = 1;
     let currentStatusId = req.body.currentDealStatusId;
     let buyerId = req.body.buyerId; 
     let homeOwnerId = 1; 
     let propertyId = 3; 
 

	   return conn.query('call sp_homeowner_update_deal_status(?,?,?,?,?)',[
       userType,currentStatusId,buyerId,homeOwnerId,propertyId

     ],function(err,rows){
            conn.release();
            if(err){
              logger.error('Exception while fetching claimed properties :'+err);
              return res.json({status:0,resp:'Exception while fetching claimed properties :'+err}) 
            }
            return  res.json({status:1,resp:rows[0]});
          });
	   });



})
module.exports = router;
