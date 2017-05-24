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
           
        var obj={
                    "userType" : 1
                };

        checklistModalFactory.getModalCheckList(obj).then(function(result){
            $scope.checklist = result.data.resp ;
                
                
                for (var i=0;i<$scope.checklist.length;i++){
                    $scope.checklist[0].checked = true;
                    $scope.checklist[i].checked = false;
                }

                $scope.getSequenceByIndexDealStatusId(commonDataHolder.holdData.dealStatus);
        });

    };
    // loading modal checklist
    $scope.getModalCheckList();
 
   	$scope.getSequenceByIndexDealStatusId=function(id){

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
  	 
	$scope.userEventFunction = function(item){
			
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
                 
                 $scope.UpdateDealStatus(nextIndex);  
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
            
			 $scope.UpdateDealStatus(currentIndex);
            	 
		}
           
	};

    $scope.getSequence=function(item){
            var checkedObj = item;
			var obj ={
				"currentStatusId" : item.dealStatusId,
                "userType" : 1
			};
	  checklistModalFactory.getSequenceByDealStatusId(obj).then(function(result){
              
             	currentIndex=result.data.resp[0].sequenceId;
				//nextIndex = currentIndex + 1;
                
                $scope.userEventFunction(checkedObj);   
               
       });
	};
    $scope.UpdateDealStatus = function(id){
       
              var obj={
                    "currentDealStatusId" : id,
                    "buyerId" : 3 , // commonDataHolder.holdData.buyerId
                    "propertyOwnerId" : "1",
                    "userType" : 1
                };

        checklistModalFactory.updateCheckList(obj).then(function(result){
              
             	 console.log(result)   
               
       }); 
    };
 
	    
}]);

