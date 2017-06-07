var eknock = eknock || angular.module('eknock');
eknock.controller('PropertyController', ['$rootScope', '$scope', '$state', 'PropertyFactory', '_', '$stateParams', function ($rootScope, $scope, $state, PropertyFactory, _, $stateParams) {
    $scope.init = function () {
        if ($stateParams.property != undefined) {
            PropertyFactory.getPropertiesDetailsByPropertyId($stateParams.property.id).then(function (resp) {
                if (resp.data.status === 1) {
                    $scope.propertyDetails = resp.data.resp;
                }
            });
            $scope.$emit('propertyListingEvent', $stateParams.property.address);
        } else {
            $scope.$emit('propertyListingEvent', '');
        }
    }

    $scope.init();
}]);