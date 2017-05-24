var eknock=eknock||angular.module('eknock');

eknock.controller('ParentController',['$rootScope','$scope','$state',function($rootScope,$scope,$state){
      
      $scope.searchPropertyBroadCast=function(){
    	$scope.$broadcast('searchTextDataEvent', $scope.searchText);
    	$state.go('search');
      }

}]);