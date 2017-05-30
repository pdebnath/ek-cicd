var eknock=eknock||angular.module('eknock');
eknock.controller('HomeOwnerController',['$rootScope','$scope','$state','_','HomeOwnerFactory','$uibModal','commonDataHolder',function($rootScope,$scope,$state,_,HomeOwnerFactory,$uibModal,commonDataHolder){
    /* init Data*/
    $scope.sortingArray = [
                            {type: 1, value: 'Newest'},
                            {type: 2, value: 'Old'}
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

    $scope.redirectToModal = function(obj){
       commonDataHolder.holdData = obj;
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
            return obj.dealInfo.dealStatus;
          });

          $scope.cPropertyOpen=$scope.groupData.open;
          $scope.cPropertyOnGoing=$scope.groupData.progress;
          $scope.cPropertyClosed=$scope.groupData.closed;

         /* Sorting funvtionality*/
          $scope.cPropertyOnGoing=_.sortBy($scope.cPropertyOnGoing, function(obj){return obj.modifiedDate;}); 
          $scope.cPropertyOpen=_.sortBy($scope.cPropertyOpen, function(obj){return obj.modifiedDate;}) 
          $scope.cPropertyClosed=_.sortBy($scope.cPropertyClosed, function(obj){return obj.modifiedDate;});

          if($scope.sortingType.type==2){
              $scope.cPropertyOnGoing=$scope.cPropertyOnGoing.reverse();
              $scope.cPropertyOpen=$scope.cPropertyOpen.reverse();
              $scope.cPropertyClosed=$scope.cPropertyClosed.reverse();
          }
           console.log($scope.groupData)
    }

  $scope.init();
}]);