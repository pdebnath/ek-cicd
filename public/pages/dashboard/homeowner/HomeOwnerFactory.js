var eknock=eknock||angular.module('eknock');

eknock.factory('HomeOwnerFactory',['$http','$log','$q',function($http,$log,$q){
	return{
        	getClaimedPropertyList:function(model){
			var deferred=$q.defer();
			$http({url:'/api/homeowner/dashboard/getClaimedProperties/',data:model,method:'post',headers: {'Content-Type': 'application/json'}})
			.then(function onSuccess(resp) {
			   	deferred.resolve(resp);
			  },function onError(error) {
			  	deferred.reject('Error While fetching ClaimedProperties list');
			  });
			return deferred.promise;
	   	},
		getClaimedPropertyDeals:function(model){
			var deferred=$q.defer();
			$http({url:'/api/homeowner/dashboard/getClaimedPropertiesDeals/',data:model,method:'post',headers: {'Content-Type': 'application/json'}})
			.then(function onSuccess(resp) {
			   	deferred.resolve(resp);
			  },function onError(error) {
			  	deferred.reject('Error While fetching  ClaimedProperties deals');
			  });
			return deferred.promise;
	   	},
	   	acceptOrDeclineRequest:function(model){
			var deferred=$q.defer();
			$http({url:'/api/homeowner/dashboard/dealStatusUpdate/',data:model,method:'post',headers: {'Content-Type': 'application/json'}})
			.then(function onSuccess(resp) {
			   	deferred.resolve(resp);
			  },function onError(error) {
			  	deferred.reject('Error While fetching  ClaimedProperties deals');
			  });
			return deferred.promise;
	   	},
	   	
        }
}])