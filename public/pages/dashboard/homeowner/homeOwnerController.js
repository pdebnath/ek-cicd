var eknock=eknock||angular.module('eknock');
eknock.controller('HomeOwnerController',['$rootScope','$scope','$state','HomeOwnerFactory','$uibModal','commonDataHolder',function($rootScope,$scope,$state,HomeOwnerFactory,$uibModal,commonDataHolder){
   
    $scope.init=function(){
        $scope.claimedProperties=[];
        $scope.model={userId:2}
        HomeOwnerFactory.getClaimedPropertyList($scope.model).then(function(resp){
            if(resp.data.status===1){
                $scope.claimedProperties=resp.data.resp;
            }
        })
    }
    $scope.test=5;
    $scope.getClaimedPropertyDeals=function(){
         $scope.cPropertyOpen=[];
         $scope.cPropertyonGoing=[];
         $scope.cPropertyclosed=[];
        $scope.model={propertyId:2}
        HomeOwnerFactory.getClaimedPropertyDeals($scope.model).then(function(resp){
            if(resp.data.status===1){
                $scope.claimedPropertyDeals=resp.data.resp;
            }
            $scope.data1=resp.data.resp;
            for(var i=0;i<$scope.data1.length;i++){
                if($scope.data1[i].dealPr===1)
                   $scope.cPropertyOpen.push($scope.data1[i]);
                else  if($scope.data1[i].dealPr===2) 
                    $scope.cPropertyonGoing.push($scope.data1[i]);
                else  if($scope.data1[i].dealPr===3) 
                    $scope.cPropertyclosed.push($scope.data1[i]);
            }
                            console.log($scope.cPropertyOpen);
                            console.log($scope.cPropertyonGoing);
                            console.log($scope.cPropertyclosed);
        })
    }
$scope.init();
$scope.getClaimedPropertyDeals();
      $scope.clickedCard=false;
    $scope.redirectToModal = function(obj){
       commonDataHolder.holdData = obj;
        var size;
     var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'pages/dashboard/modal/commonModal.html',
          controller: 'commonChecklistController',
          size: size
        });
    }

}]);