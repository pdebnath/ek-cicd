let express = require('express');
let router = express.Router();
let logger = require('./../../config/logger');
let excuteQuery=require('./../../config/mysqldatasource');

// retrieving checklist modal based on role

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

// retrieving checklist modal sequence based on statusid and user role

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

// updating checklist modal sequence based on role,status

router.post('/modal/details/update',  (req ,res) => {
       excuteQuery((conn,err) => {
 
	   return conn.query('call sp_update_homeowner_deal_status(?,?,?)',[
       req.body.dealStatus , req.body.currentDealStatusId , req.body.propertyDealId

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
