var eknock=eknock||angular.module('eknock');
    
eknock.controller('commonChecklistController',['$rootScope','$scope','$state','HomeOwnerFactory','$http','$uibModalInstance','checklistModalFactory','commonDataHolder'
,function($rootScope,$scope,$state,HomeOwnerFactory,$http,$uibModalInstance,checklistModalFactory,commonDataHolder){
        
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        var currentIndex ;
        var nextIndex;

        $scope.checklist = [];
        $scope.disabledList =[];
		$scope.checkeddList =[];
		 
       $scope.getModalCheckList = function(){
           
        var objgetModalCheckList={
                    "userType" : 1
                };

        checklistModalFactory.getModalCheckList(objgetModalCheckList).then(function(result){
            $scope.checklist = result.data.resp ;
                
                
                for (var i=0;i<$scope.checklist.length;i++){
                    $scope.checklist[0].checked = true;
                    $scope.checklist[i].checked = false;
                }

                getSequenceByIndexDealStatusId(6);
        });

    };
    // loading modal checklist
    $scope.getModalCheckList();
 
   	function getSequenceByIndexDealStatusId  (id){

                    currentIndex = id;
                    nextIndex = currentIndex+1; 
                    
                    if(currentIndex >= 2){
                        $scope.disabledList =[currentIndex,nextIndex];
                    }else{
                         $scope.disabledList =[nextIndex];
                    }
                    
		            $scope.checkeddList =[currentIndex];
                           
                    
                    commonDataHolder.holdData={};
                   
                for (var i=0;i<currentIndex;i++){
                     $scope.checklist[i].checked=true;
                     $scope.checkeddList.push(i);
                }
     };
  	 
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
                 
                 UpdateDealStatus(nextIndex);  
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
            
			 UpdateDealStatus(currentIndex);
            	 
		}
           
	};

    $scope.getSequence=function(item){
            var checkedObj = item;
			var objgetSequence ={
				"currentStatusId" : item.dealStatusId,
                "userType" : 1
			};
	  checklistModalFactory.getSequenceByDealStatusId(objgetSequence).then(function(result){
              
             	currentIndex=result.data.resp[0].sequenceId;
				//nextIndex = currentIndex + 1;
                
                userEventFunction(checkedObj);   
               
       });
	};
    function UpdateDealStatus (id){
       
              var objUpdateDealStatus={
                    "userType" : 1,
                    "currentDealStatusId" : id,
                    "buyerId" : 3 , // commonDataHolder.holdData.buyerId
                    "homeOwnerId" : "1",
                    "propertyId" : 3
                };

        checklistModalFactory.updateCheckList(objUpdateDealStatus).then(function(result){
              
             	 console.log(result);
               
       }); 
    };
 
	    
}]);

