var eknock = eknock || angular.module('eknock');
eknock.factory('PropertyFactory', ['$http', '$log', '$q', function ($http, $log, $q) {
	return {
		getPropertiesDetailsByPropertyId: function (model) {
			var deferred = $q.defer();
			var propertyId = { "propertyId": model };
			$http({ url: '/api/property_view/getPropertiesDetailsByPropertyId/', data: propertyId, method: 'post', headers: { 'Content-Type': 'application/json' } })
				.then(function onSuccess(resp) {
					deferred.resolve(resp);
				}, function onError(error) {
					deferred.reject('Property details by Address');
				});
			return deferred.promise;
		},
	}
}])