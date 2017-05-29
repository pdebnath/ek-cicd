var eknock=eknock||angular.module('eknock');
eknock.controller('HomeOwnerController',['$rootScope','$scope','$state','_','HomeOwnerFactory','$uibModal','commonDataHolder',function($rootScope,$scope,$state,_,HomeOwnerFactory,$uibModal,commonDataHolder){
    /* init Data*/
    $scope.sortingArray = [
                            {type: 1, value: 'Newest'},
                            {type: 2, value: 'Old'}
                          ];
    $scope.movePriceArray=[
                            {value: 1, percentage: '10%'},
                            {value: 2, percentage: '20%'},
                            {value: 3, percentage: '30%'}
                          ];
    $scope.verificationArray=[
                                {value: 1, percentage: '1'},
                                {value: 2, percentage: '2'}
                            ];

   /* this function fetch claimed properties*/
    $scope.init=function(){
        
        $scope.claimedProperties=[];
        $scope.model={userId:2}
        HomeOwnerFactory.getClaimedPropertyList($scope.model).then(function(resp){
            if(resp.data.status===1){
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
            if(resp.data.status===1){
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

         $scope.groupData=[];

         /* filter for Bulk Request*/
         if($scope.notBulkRequest){
           $scope.groupData= _.filter($scope.claimedPropertyDeals,function(obj){return obj.contactedViaBulk == 1;});
         }else{
            $scope.groupData=$scope.claimedPropertyDeals;
         }
         /* code for devideing groups*/
         $scope.groupData=_.groupBy($scope.claimedPropertyDeals,function(obj){
            if(obj.dealInfo.dealStatus===undefined){
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

          if($scope.sortingType.type===2){
              $scope.cPropertyOnGoing=$scope.cPropertyOnGoing.reverse();
              $scope.cPropertyOpen=$scope.cPropertyOpen.reverse();
              $scope.cPropertyClosed=$scope.cPropertyClosed.reverse();
          }
          console.log($scope.cPropertyClosed)
    }

    function isJson(str) {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
    return true;
    }
$scope.init();
}]);