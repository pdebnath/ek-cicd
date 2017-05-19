var eknock=eknock||angular.module('eknock');
eknock.controller('HomeOwnerController',['$rootScope','$scope','$state','HomeOwnerFactory',function($rootScope,$scope,$state,HomeOwnerFactory){
   
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
        $scope.claimedPropertyDeals=[];
        $scope.model={propertyId:2}
        HomeOwnerFactory.getClaimedPropertyDeals($scope.model).then(function(resp){
            if(resp.data.status===1){
                $scope.claimedPropertyDeals=resp.data.resp;
            }
            console.log($scope.claimedPropertyDeals);
        })
    }
$scope.init();
$scope.getClaimedPropertyDeals();
}]);