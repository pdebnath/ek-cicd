var eknock = eknock || angular.module('eknock');
eknock.controller('PropertyController', ['$rootScope', '$scope', '$state', 'PropertyFactory', '_', function ($rootScope, $scope, $state, PropertyFactory, _) {
    $scope.init = function () {
        alert('In Property Controller')
    }

    $scope.init();
}]);