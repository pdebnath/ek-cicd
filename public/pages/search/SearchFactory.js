var eknock = eknock || angular.module('eknock');

eknock.factory('SearchFactory', ['$http', '$log', '$q', function ($http, $log, $q) {
	return {
		getPropertyDetailsByAddress: function (model) {
			var deferred = $q.defer();
			var addressData = { "address": model };
			$http({ url: '/api/search/getPropertiesDetailsByAddress/', data: addressData, method: 'post', ignoreLoadingBar: true, headers: { 'Content-Type': 'application/json' } })
				.then(function onSuccess(resp) {
					deferred.resolve(resp);
				}, function onError(error) {
					deferred.reject('Property details by Address');
				});
			return deferred.promise;
		},

		getPropertyDetailsByLatlng: function (model) {
			var deferred = $q.defer();
			var addressData = { "latlng": model };
			$http({ url: '/api/search/getPropertiesDetailsByLatlng/', data: addressData, method: 'post', headers: { 'Content-Type': 'application/json' } })
				.then(function onSuccess(resp) {
					deferred.resolve(resp);
				}, function onError(error) {
					deferred.reject('Error While fetching  Property details by Latlng');
				});
			return deferred.promise;
		},

		contactToAllHomeOwners: function (model) {
			var deferred = $q.defer();
			var propertiesData = { "key": model };
			$http({ url: '/api/search/contactToAllHomeOwners/', data: propertiesData, ignoreLoadingBar: true, method: 'post', headers: { 'Content-Type': 'application/json' } })
				.then(function onSuccess(resp) {
					deferred.resolve(resp);
				}, function onError(error) {
					deferred.reject('Error While Contact to all home owners deals');
				});
			return deferred.promise;
		},

		viewPropertyDetails: function (model) {
			var deferred = $q.defer();
			var propertyData = { "key": model };
			$http({ url: '/api/search/viewPropertyDetails/', data: propertyData, method: 'post', headers: { 'Content-Type': 'application/json' } })
				.then(function onSuccess(resp) {
					deferred.resolve(resp);
				}, function onError(error) {
					deferred.reject('Error While viewing the property details');
				});
			return deferred.promise;
		},

		getFavoritesCount: function (model) {
			var deferred = $q.defer();
			$http({ url: '/api/search/getFavoriteCount', data: model, method: 'post', headers: { 'Content-Type': 'application/json' } })
				.then(function onSuccess(resp) {
					deferred.resolve(resp);
				}, function onError(error) {
					deferred.reject('Error While viewing the property details');
				});
			return deferred.promise;
		},
		getFavorites: function (model) {
			var deferred = $q.defer();
			$http({ url: '/api/search/getFavorites', data: model, method: 'post', headers: { 'Content-Type': 'application/json' } })
				.then(function onSuccess(resp) {
					deferred.resolve(resp);
				}, function onError(error) {
					deferred.reject('Error While viewing the property details');
				});
			return deferred.promise;
		},
		saveFavorites: function (model) {
			var deferred = $q.defer();
			$http({ url: '/api/search/saveFavoriteProperty', data: model, method: 'post', headers: { 'Content-Type': 'application/json' } })
				.then(function onSuccess(resp) {
					deferred.resolve(resp);
				}, function onError(error) {
					deferred.reject('Error While viewing the property details');
				});
			return deferred.promise;
		},
		removeFavorite: function (model) {
			var deferred = $q.defer();
			$http({ url: '/api/search/removeFavoriteProperty', data: model, method: 'post', headers: { 'Content-Type': 'application/json' } })
				.then(function onSuccess(resp) {
					deferred.resolve(resp);
				}, function onError(error) {
					deferred.reject('Error While viewing the property details');
				});
			return deferred.promise;
		}
	}
}])