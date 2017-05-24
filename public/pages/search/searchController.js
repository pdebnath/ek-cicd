var eknock=eknock||angular.module('eknock');
eknock.controller('SearchController',['$rootScope','$scope','$state','SearchFactory',function($rootScope,$scope,$state,SearchFactory){

   $scope.$on('searchTextDataEvent', function (event, data) {

  });
   console.log($scope.$parent.searchText)
}]);