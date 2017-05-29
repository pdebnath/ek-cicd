var eknock = eknock || angular.module('eknock');

eknock.factory('SearchFactory', ['$http', '$log', '$q', function ($http, $log, $q) {
	return {
		getPropertyDetailsByAddress: function (model) {
			var deferred = $q.defer();
			$http({ url: '/api/search/getPropertiesDetailsByAddress/', model, method: 'post', headers: { 'Content-Type': 'application/json' } })
				.then(function onSuccess(resp) {
					deferred.resolve(resp);
				}, function onError(error) {
					deferred.reject('Property details by Address');
				});
			return deferred.promise;
		},

		getPropertyDetailsByLatlng: function (model) {
			var deferred = $q.defer();
			$http({ url: '/api/search/getPropertiesDetailsByLatlng/', model, method: 'post', headers: { 'Content-Type': 'application/json' } })
				.then(function onSuccess(resp) {
					deferred.resolve(resp);
				}, function onError(error) {
					deferred.reject('Error While fetching  Property details by Latlng');
				});
			return deferred.promise;
		},

		contactToAllHomeOwners: function (model) {
			var deferred = $q.defer();
			$http({ url: '/api/search/contactToAllHomeOwners/', model, method: 'post', headers: { 'Content-Type': 'application/json' } })
				.then(function onSuccess(resp) {
					deferred.resolve(resp);
				}, function onError(error) {
					deferred.reject('Error While fetching  Contact to all home owners deals');
				});
			return deferred.promise;
		},
	}
}])