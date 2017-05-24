var eknock=eknock||angular.module('eknock');
eknock.controller('HomeOwnerController',['$rootScope','$scope','$state','HomeOwnerFactory',function($rootScope,$scope,$state,HomeOwnerFactory){
   
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
                /*console.log($scope.cPropertyOpen);
                console.log($scope.cPropertyonGoing);
                console.log($scope.cPropertyclosed);*/
        })
    }
$scope.init();

}]);