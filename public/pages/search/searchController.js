var eknock = eknock || angular.module('eknock');
eknock.controller('SearchController', ['$rootScope', '$scope', '$state', 'SearchFactory', '_', function ($rootScope, $scope, $state, SearchFactory, _) {

    $scope.init = function () {
        if ($scope.searchText) {
            console.log($scope.searchText);
            getPropertyDetailsByAddress($scope.searchText);
        } else if ($scope.latlng) {
            console.log($scope.latlng);
            getPropertyDetailsByLatlng($scope.latlng);
        } else {
            alert('It appears that you have entered an invalid address. Please check your search criteria');
            //$scope.searchPropertiesByLatlng();
        }
    }

  /*  getPropertyDetailsByAddress = function (data) {

        SearchFactory.getPropertyDetailsByAddress(data).then(function (resp) {
            if (resp.data.status === 1) {
                $scope.propertyDetails = resp.data.resp;
            }
            //console.log($scope.propertyDetails);
            $scope.propertyDetailsJson = JSON.parse($scope.propertyDetails).reverse();
            console.log($scope.propertyDetailsJson.length);
        })
    }

    getPropertyDetailsByLatlng = function (data) {
        SearchFactory.getPropertyDetailsByLatlng(data).then(function (resp) {
            if (resp.data.status === 1) {
                $scope.propertyDetails = resp.data.resp;
            }
            $scope.propertyDetailsJson = JSON.parse($scope.propertyDetails).reverse();
            console.log($scope.propertyDetailsJson.length);
        });
    }*/

    $scope.propertyDetailsJson=[];
    getPropertyDetailsByAddress = function (data) {

        SearchFactory.getPropertyDetailsByAddress(data).then(function (resp) {
            if (resp.data.status === 1) {
                $scope.propertyDetails = resp.data.resp;
            }
            //console.log($scope.propertyDetails);
            var resultData = JSON.parse($scope.propertyDetails).reverse();
            _.each(resultData, function(data) {
                    $scope.propertyDetailsJson.push(data);
                })
            console.log($scope.propertyDetailsJson.length);
        })
    }

    getPropertyDetailsByLatlng = function (data) {
        SearchFactory.getPropertyDetailsByLatlng(data).then(function (resp) {
            if (resp.data.status === 1) {
                $scope.propertyDetails = resp.data.resp;
            }
           var resultData = JSON.parse($scope.propertyDetails).reverse();
            _.each(resultData, function(data) {
                    $scope.propertyDetailsJson.push(data);
                })
            console.log($scope.propertyDetailsJson.length);
        });
    }

    $scope.propertySortBy = function (data) {
        if (data == 'id') {
            $scope.propertyDetailsJson = _.sortBy($scope.propertyDetailsJson, function (property) {
                return property.id;
            });
        } else if (data == 'apn') {
            $scope.propertyDetailsJson = _.sortBy($scope.propertyDetailsJson, function (property) {
                return property.apn;
            });
        }
    }

    $scope.$on('searchPropertiesByAddressEvent', function (event, data) {
        console.log(data);
        getPropertyDetailsByLatlng(data);
    });

    $scope.$on('searchPropertiesByLatlngEvent', function (event, data) {
        console.log(data);
        getPropertyDetailsByLatlng(data);
    });


    /*
    Contact to all Homeowners
    */
    $scope.onContactAllHomeowners = function (propertiesDeatils) {
        var propertyIds = _.pluck(propertiesDeatils, 'id');
        alert(propertyIds);
        SearchFactory.contactToAllHomeOwners(propertiesDeatils).then(function (resp) {
            if (resp.data.status === 1) {
                alert(resp.data.resp);
            }
        });
    }

    // --------- Favorites related functionalities ----- Start-----------
    $scope.showFavorites = function() {
        SearchFactory.showFavorites(user_id).then(function (resp) {
            alert(user_id);
            if (resp.data.status === 1) {
                alert(resp.data.resp);               
            }
        });
    }

    $scope.getFavoritesCount = function() {
    }

    $scope.saveFavorite = function() {        
    }

    $scope.removeFavorite = function() {        
    }
    // --------- Saved Search related functionalities ----- Start-----------
    $scope.showSavedSearches = function() {
    }

    $scope.applySavedSearch = function() {
    }

    $scope.saveSavedSearch = function() {        
    }

    $scope.removeSavedSearch = function() {        
    }

    //---------------------- View Property Details ---------Start--------------
    $scope.viewPropertyDetails = function(propertyId){
        alert(propertyId);
        SearchFactory.viewPropertyDetails(propertyId).then(function (resp) {
            if (resp.data.status === 1) {
                alert(resp.data.resp);
                $state.go('property_details');
            }
        });
    }

    $scope.init();

}]);


