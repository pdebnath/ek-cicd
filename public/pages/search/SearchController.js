var eknock = eknock || angular.module('eknock');
eknock.controller('SearchController', ['$rootScope', '$scope', '$state', 'SearchFactory', '_', '$uibModal', 'NgMap', function ($rootScope, $scope, $state, SearchFactory, _, $uibModal, NgMap) {

    $scope.init = function () {
        if ($scope.searchText) {
            console.log($scope.searchText);
            getPropertyDetailsByAddress($scope.searchText);
        } else if ($scope.latlng) {
            console.log($scope.latlng);
            getPropertyDetailsByLatlng($scope.latlng);
        } else {
            //alert('It appears that you have entered an invalid address. Please check your search criteria');
            //$scope.searchPropertiesByLatlng();
        }
    }

    $scope.propertyDetailsJson = [];
    $scope.getPropertyDetailsinfiniteScroll = function () {
        if ($scope.searchText) {
            console.log($scope.searchText);
            SearchFactory.getPropertyDetailsByLatlng($scope.searchText).then(function (resp) {
                if (resp.data.status === 1) {
                    $scope.propertyDetails = resp.data.resp;
                }
                var resultData = JSON.parse($scope.propertyDetails);
                _.each(resultData, function (data) {
                    $scope.propertyDetailsJson.push(data);
                })
                console.log($scope.propertyDetailsJson.length);
            });
        } else if ($scope.latlng) {
            console.log($scope.latlng);
            SearchFactory.getPropertyDetailsByLatlng($scope.latlng).then(function (resp) {
                if (resp.data.status === 1) {
                    $scope.propertyDetails = resp.data.resp;
                }
                var resultData = JSON.parse($scope.propertyDetails);
                _.each(resultData, function (data) {
                    $scope.propertyDetailsJson.push(data);
                })
                console.log($scope.propertyDetailsJson.length);
            });
        } else {
            //alert('It appears that you have entered an invalid address. Please check your search criteria');
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


    getPropertyDetailsByAddress = function (data) {
        //$scope.$emit('searchDataEvent', data);
        $scope.propertyDetailsJson.length = 0;
        SearchFactory.getPropertyDetailsByAddress(data).then(function (resp) {
            if (resp.data.status === 1) {
                $scope.propertyDetails = resp.data.resp;
            }
            var resultData = JSON.parse($scope.propertyDetails);
            _.each(resultData, function (data) {
                $scope.propertyDetailsJson.push(data);
            })
            console.log($scope.propertyDetailsJson.length);
            $scope.setMapBounds();
            //$('#expandMap').trigger('click');             
        })
    }

    getPropertyDetailsByLatlng = function (data) {
        //$scope.$emit('searchDataEvent', data);
        $scope.propertyDetailsJson.length = 0;
        SearchFactory.getPropertyDetailsByLatlng(data).then(function (resp) {
            if (resp.data.status === 1) {
                $scope.propertyDetails = resp.data.resp;
            }
            var resultData = JSON.parse($scope.propertyDetails);
            _.each(resultData, function (data) {
                $scope.propertyDetailsJson.push(data);
            })
            console.log($scope.propertyDetailsJson.length);
            $scope.setMapBounds();
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
        $scope.propertyDetailsJson.length = 0;
        getPropertyDetailsByAddress(data);
    });

    $scope.$on('searchPropertiesByLatlngEvent', function (event, data) {
        console.log(data);
        $scope.propertyDetailsJson.length = 0;
        getPropertyDetailsByLatlng(data);
    });


    /*
    Contact to all Homeowners
    */
    $scope.onContactAllHomeowners = function (propertiesDeatils) {
        if (propertiesDeatils.length > 0) {
            SearchFactory.contactToAllHomeOwners(propertiesDeatils).then(function (resp) {
                if (resp.data.status === 1) {
                    alert(resp.data.resp);
                }
            });
        } else {
            alert("No properties to send reqeust");
        }
    }

    // --------- Favorites related functionalities ----- Start-----------
    $scope.userFavoritesObjArray = [];
    $scope.showFavorites = function () {
        var size = 'md';
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'pages/search/favorite-modal.html',
            scope: $scope,
            size: size
        });
        var objgetFavorites = {
            "userId": 4
        }
        SearchFactory.getFavorites(objgetFavorites).then(function (data) {
            $scope.userFavoritesObjArray = data.data.resp;
            for (var i = 0; i < $scope.userFavoritesObjArray.length; i++) {
                $scope.userFavoritesObjArray[i].checked = true;
            }
            console.log($scope.userFavoritesObjArray)
        });
    }

    $scope.getFavoritesCount = function () {
        var objgetFavoritesCount = {
            "userId": 4
        }
        SearchFactory.getFavoritesCount(objgetFavoritesCount).then(function (data) {
            $scope.favoritePropertiesCount = data.data.resp[0].propFavoritesCount;
        });
    };
    $scope.getFavoritesCount();

    $scope.saveFavorite = function (data) {
        var objsaveFavorite = {
            "userId": 4,
            "quantariumId": data.id,
            "address": data.address,
            "propertyValue": 125000,
            "mode": 0,
        }
        SearchFactory.saveFavorites(objsaveFavorite).then(function (data) {
            console.log(data)
            $scope.favoritePropertiesCount = $scope.favoritePropertiesCount + 1;
            //   $scope.getFavoritesCount();
        });
    };

    $scope.removeFavorite = function (obj) {
        console.log(obj)
        var objremoveFavorite = {
            "userId": 4,
            "mode": 1,
            "propertyId": obj.propertyId
        }

        SearchFactory.removeFavorite(objremoveFavorite).then(function (data) {
            if (data.data.status == 1) {
                $scope.favoritePropertiesCount = $scope.favoritePropertiesCount - 1;
                $scope.userFavoritesObjArray = _.without($scope.userFavoritesObjArray, _.findWhere($scope.userFavoritesObjArray, {
                    propertyId: obj.propertyId
                }));
            }

        });
    }
    // --------- Favorites related functionalities ----- End-----------
    // --------- Saved Search related functionalities ----- Start-----------
    $scope.showSavedSearches = function () {
    }

    $scope.applySavedSearch = function () {
    }

    $scope.saveSavedSearch = function () {
    }

    $scope.removeSavedSearch = function () {
    }

    //---------------------- View Property Details ---------Start--------------
    $scope.viewPropertyDetails = function (property) {
        console.log(property);
        SearchFactory.viewPropertyDetails(property).then(function (resp) {
            if (resp.data.status === 1) {
                alert(resp.data.resp);
                $state.go('property_details', { 'property': property });
            }
        });
    }

    $scope.viewPropertyDetailsMap = function (e, property) {
        SearchFactory.viewPropertyDetails(property).then(function (resp) {
            if (resp.data.status === 1) {
                alert(resp.data.resp);
                $state.go('property_details', { 'property': property });
            }
        });
    }

    $scope.setMapBounds = function () {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < $scope.propertyDetailsJson.length; i++) {
            var latlng = new google.maps.LatLng($scope.propertyDetailsJson[i].latitude, $scope.propertyDetailsJson[i].longitude);
            bounds.extend(latlng);
        }
        NgMap.getMap().then(function (map) {
            map.setCenter(bounds.getCenter());
            map.fitBounds(bounds);
        })
    }

    $scope.showDetailMap = function (e, property) {
        $scope.propertyDetails = property;
        NgMap.getMap().then(function (map) {
            map.showInfoWindow('info-iw', $scope.propertyDetails.id);
        })
    };

    $scope.showDetail = function (property) {
        $scope.propertyDetails = property;
        NgMap.getMap().then(function (map) {
            map.showInfoWindow('info-iw', $scope.propertyDetails.id);
        })
    };

    $scope.expand = function () {
        if ($scope.expandMap) {
            $('#flat-cards').removeClass('col-md-6').addClass('col-md-4');
            $('#flat-cards > div.col-sm-6').addClass('col-md-12');
            $('#mapConteroller').removeClass('col-md-6').addClass('col-md-8');
            $scope.setMapBounds();
        } else {
            $('#flat-cards').removeClass('col-md-4').addClass('col-md-6');
            $('#mapConteroller').removeClass('col-md-8').addClass('col-md-6');
            $('#flat-cards > div.col-sm-6').removeClass('col-md-12');
            $scope.setMapBounds();
        }
    };


    $scope.init();
}]);


