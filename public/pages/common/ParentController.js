var eknock = eknock || angular.module('eknock');
eknock.controller('ParentController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {

    $scope.searchPropertiesByAddress = function () {
        if ($scope.searchText != '' && $scope.searchText != undefined) {
            $scope.latlng = null;
            $scope.searchData = 'HOMES IN ' + $scope.searchText;
            $scope.$broadcast('searchPropertiesByAddressEvent', $scope.searchText);
            $state.go('search');
        } else {
            alert('It appears that you have entered an invalid address. Please check your search criteria');
        }
    };

    $scope.$on('propertyListingEvent', function (event, data) {
        $scope.searchData = data;
    });

    $scope.$on('searchDataEvent', function (event, data) {
        $scope.searchData = data;
    });

    $scope.searchPropertiesByLatlng = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCurrentLocation, showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    getCurrentLocation = function (position) {
        $scope.searchText = null;
        $scope.searchData = 'HOMES NEAR TO YOUR LOCATION';
        $scope.latlng = position.coords.latitude + "," + position.coords.longitude;
        $scope.$broadcast('searchPropertiesByLatlngEvent', $scope.latlng);
        $state.go('search');
    };

    showError = function (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    };
}]);