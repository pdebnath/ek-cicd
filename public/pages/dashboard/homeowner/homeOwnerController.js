var eknock=eknock||angular.module('eknock');
eknock.controller('HomeOwnerController',['$rootScope','$scope','$state','_','HomeOwnerFactory','$uibModal','commonDataHolder',function($rootScope,$scope,$state,_,HomeOwnerFactory,$uibModal,commonDataHolder){
    /* init Data*/
    $scope.sortingArray = [
                            {type: 1, value: 'Newest first'},
                            {type: 2, value: 'Oldest first'},
                            {type: 3, value: 'Progress of the deal '},
                            {type: 4, value: 'Offer/level of interest price '}
                             
                          ];
    $scope.movePriceArray=[
                            {value: 0.9, percentage: '10%'},
                            {value: 0.8, percentage: '20%'},
                            {value: 0.7, percentage: '30%'}
                          ];
    $scope.verificationArray=[
                                {value: 1, verificatons: '1'},
                                {value: 2, verificatons: '2'}
                            ];

   /* this function fetch claimed properties*/
    $scope.init=function(){
        
        $scope.claimedProperties=[];
        $scope.model={userId:1}
        HomeOwnerFactory.getClaimedPropertyList($scope.model).then(function(resp){
            if(resp.data.status==1){
                $scope.claimedProperties=resp.data.resp;
                if($scope.claimedProperties.length>0){
                    $scope.claimedProperty=$scope.claimedProperties[0];
                    $scope.getClaimedPropertyDeals();
                }
            }
        })
    }

    /* this function fetch deals for one claimed 
    property based on claimded property drop down*/
    $scope.getClaimedPropertyDeals=function(){
         $scope.cPropertyOpen=[];
         $scope.cPropertyonGoing=[];
         $scope.cPropertyclosed=[];
        $scope.model={
            propertyId:$scope.claimedProperty.propertyId
        }
        HomeOwnerFactory.getClaimedPropertyDeals($scope.model).then(function(resp){
            if(resp.data.status==1){
                $scope.claimedPropertyDeals=resp.data.resp;
                $scope.devideDeals();
            }
        })
    }

    /* This function is used accept or decline Buyer Request*/
    $scope.acceptOrDeclineRequest=function(dealId,status){
       $scope.model={
        userType:1,
        currentDealStatusId:status,
        propertyDealId:dealId
      }
       HomeOwnerFactory.acceptOrDeclineRequest($scope.model).then(function(resp){
            if(resp.data.status==1){
              $scope.getClaimedPropertyDeals();
            }
        })
    }
    $scope.redirectToModal = function(obj){
        var objForStore={
            "property" : obj,
            "address" : $scope.claimedProperty
        }
       commonDataHolder.data = objForStore;
        var size='lg';
        var modalInstance = $uibModal.open({  
          animation: $scope.animationsEnabled,
          templateUrl: 'pages/dashboard/modal/common-modal.html',
          controller: 'commonChecklistController',
          size: size
        });
    }



    /* this function is uded to devides deals*/
    $scope.devideDeals=function(){

         $scope.groupData=$scope.claimedPropertyDeals;

         /* filter for move Price*/
         if($scope.movePriceCheck){
            var propertyValue=$scope.groupData[0].propertyValue;
            propertyValue=propertyValue*$scope.movePrice.value;
             $scope.groupData= _.filter($scope.groupData,function(obj){
              return obj.interestPrice >= propertyValue;
             });
         }

         /* filter for Bulk Request*/
         if($scope.notBulkRequest){
           $scope.groupData= _.filter($scope.groupData,function(obj){
            return obj.contactedViaBulk == 1;
           });
         }

         /* filter for verifications*/
         if($scope.verificationCheck){

          $scope.groupData= _.filter($scope.groupData,function(obj){
            if($scope.verification.value==1){
              return (obj.idVerification == 1 || obj.financeVerification==1);
            }
            if($scope.verification.value==2){
              return (obj.idVerification == 1 && obj.financeVerification==1);
            }
          });
         }
         /* code for devideing groups*/
         $scope.groupData=_.groupBy($scope.groupData,function(obj){
            if(obj.dealInfo.dealStatus==undefined){
              obj.dealInfo=JSON.parse(obj.dealInfo);
            }
            return obj.dealStatus;
          });

          $scope.cPropertyOpen=$scope.groupData.open;
          $scope.cPropertyOnGoing=$scope.groupData.progress;
          $scope.cPropertyClosed=$scope.groupData.closed;

         /* Sorting funvtionality*/
          if($scope.sortingType.type==1){
            $scope.cPropertyOnGoing=_.sortBy($scope.cPropertyOnGoing, function(obj){return obj.modifiedDate;}); 
            $scope.cPropertyOpen=_.sortBy($scope.cPropertyOpen, function(obj){return obj.modifiedDate;}); 
            $scope.cPropertyClosed=_.sortBy($scope.cPropertyClosed, function(obj){return obj.modifiedDate;});
          }
          if($scope.sortingType.type==2){
              $scope.cPropertyOnGoing=_.sortBy($scope.cPropertyOnGoing, function(obj){return obj.modifiedDate;}).reverse();
              $scope.cPropertyOpen=_.sortBy($scope.cPropertyOpen, function(obj){return obj.modifiedDate;}).reverse();
              $scope.cPropertyClosed=_.sortBy($scope.cPropertyClosed, function(obj){return obj.modifiedDate;}).reverse();
          }
          if($scope.sortingType.type==3){
            $scope.cPropertyOnGoing=_.sortBy($scope.cPropertyOnGoing, function(obj){return obj.dealInfo.dealProgress;}).reverse();; 
            $scope.cPropertyOpen=_.sortBy($scope.cPropertyOpen, function(obj){return obj.dealInfo.dealProgress;}).reverse(); 
            $scope.cPropertyClosed=_.sortBy($scope.cPropertyClosed, function(obj){return obj.dealInfo.dealProgress;}).reverse();
          }
          if($scope.sortingType.type==4){
            $scope.cPropertyOnGoing=_.sortBy($scope.cPropertyOnGoing, function(obj){return obj.interestPrice;}).reverse(); 
            $scope.cPropertyOpen=_.sortBy($scope.cPropertyOpen, function(obj){return obj.interestPrice;}).reverse(); 
            $scope.cPropertyClosed=_.sortBy($scope.cPropertyClosed, function(obj){return obj.interestPrice;}).reverse();
          }
           console.log($scope.groupData)
    }

  $scope.init();
}]);
