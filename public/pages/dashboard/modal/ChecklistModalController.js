var eknock=eknock||angular.module('eknock');
    
eknock.controller('commonChecklistController',['$rootScope','$scope','$state','HomeOwnerFactory','$http','$uibModalInstance','checklistModalFactory','commonDataHolder','$timeout'
,function($rootScope,$scope,$state,HomeOwnerFactory,$http,$uibModalInstance,checklistModalFactory,commonDataHolder,$timeout){
        
        
        var currentIndex ;
        var nextIndex;
        var lastObjectInList ;
        var userRole =  1;
        $scope.checklist = [];
        $scope.disabledList =[];
		$scope.checkeddList =[];
        $scope.propertyObject = commonDataHolder.data;
        

        /* for closing modal */ 
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }; 
		

    /* for retrivening checklist based on role */ 
       $scope.getModalCheckList = function(){

        var objgetModalCheckList={
                    "userType" : userRole
                };
 
        checklistModalFactory.getModalCheckList(objgetModalCheckList).then(function(result){
            $scope.checklist = result.data.resp ;
                
                for (var i=0;i<$scope.checklist.length;i++){
                    $scope.checklist[0].checked = true;
                    $scope.checklist[i].checked = false;
                 }
                //  var result = _.filter( $scope.checklist, function(someThing) {
                //        return someThing.name == "Hire concierge (optional)" 
                //  })
                //  console.log(result)
                lastObjectInList = $scope.checklist[$scope.checklist.length - 1];
                
				$timeout(function(){
								$.material.init();
						},1000);

               
                getSequenceByIndexDealStatusId($scope.propertyObject.property.homeOwnerDealStatusId);
               
        });

      };

     /* for enable/disable checklist based on sequenceId */ 
   	function getSequenceByIndexDealStatusId  (seqId){

                    currentIndex = seqId;
                    nextIndex = currentIndex+1; 
                    
                    if(currentIndex >= 2){
                        $scope.disabledList =[currentIndex,nextIndex];
                    }else{
                         $scope.disabledList =[nextIndex];
                    }
                    
		            $scope.checkeddList =[currentIndex];
                           
                    
                    commonDataHolder.data={};
                   
                for (var l=0;l<currentIndex;l++){
                     $scope.checklist[l].checked=true;
                     $scope.checkeddList.push(l);
                }
     };
  	/* for handle checklist check/uncheck events  */ 
	function userEventFunction (item){
			
             if(!item.checked){
                 //Update
              
				if(item.sequenceId != 1){
					
				currentIndex = item.sequenceId;
				nextIndex = currentIndex-1;


				$scope.disabledList =[currentIndex,nextIndex];
                
               if(nextIndex >= 2){
                        $scope.disabledList =[currentIndex,nextIndex];
                }else{
                         $scope.disabledList =[currentIndex];
                }
                
				$scope.checkeddList =[currentIndex];
				for(var j=1;j<currentIndex ;j++){
					$scope.checkeddList.push(j);
				}
                 var resultObj = _.find($scope.checklist, function(obj) { return obj.sequenceId == nextIndex });
                 UpdateDealStatus(resultObj.dealStatusId);  
			}
	}else if(item.checked){
            //New
                
				if(item.sequenceId != 1){
				
				currentIndex = item.sequenceId;
				nextIndex = currentIndex+1;
				$scope.disabledList =[currentIndex,nextIndex];
                
				$scope.checkeddList =[currentIndex];
                
				for(var k=1;k<currentIndex ;k++){
					$scope.checkeddList.push(k);
				}
            }
                var resultObj = _.find($scope.checklist, function(obj) { return obj.sequenceId == currentIndex });
                UpdateDealStatus(resultObj.dealStatusId);
		}
         
	};
 /* for retrieving current sequence from checklist based on deal status id  */ 
    $scope.getSequence=function(item){
            
            var checkedObj = item;
			var objgetSequence ={
				"currentStatusId" : item.dealStatusId,
                "userType" : userRole
			};
	  checklistModalFactory.getSequenceByDealStatusId(objgetSequence).then(function(result){
              
             	currentIndex=result.data.resp[0].sequenceId;
				//nextIndex = currentIndex + 1;
                
                userEventFunction(checkedObj);   
               
       });
	};
    /* for updating current deal statusId from checklist based on user event   */ 
    function UpdateDealStatus (id){
       
              var objUpdateDealStatus={
                    "userType" : userRole,
                    "currentDealStatusId" : id,
                    "buyerId" : $scope.propertyObject.property.buyerId , 
                    "homeOwnerId" : $scope.propertyObject.property.homeOwnerId,
                    "propertyId" : $scope.propertyObject.address.propertyId,
                };
                console.log(objUpdateDealStatus)
         checklistModalFactory.updateCheckList(objUpdateDealStatus).then(function(result){
              
               	 console.log(result);
               
          }); 
    };

}]);

