var eknock=eknock||angular.module('eknock');

eknock.factory('userFactory', ['$http','$q', function($http,$q){
	return {

			loginChekingFactory:function(model){
				var deferred=$q.defer();
				$http({url:'/api/user/login/',data:model,method:'post',headers: {'Content-Type': 'application/json'}})
				.then(function onSuccess(resp) {
				   	deferred.resolve(resp);
				  },function onError(error) {
				  	deferred.reject('Error Validating User');
				  });
				return deferred.promise;
			},
			userRegister:function(model){
				var deferred=$q.defer();
				$http({url:'/api/user/register/',data:model,method:'post',headers: {'Content-Type': 'application/json'}})
				.then(function onSuccess(resp) {
				   	deferred.resolve(resp);
				  },function onError(error) {
				  	deferred.reject('Error Validating User');
				  });
				return deferred.promise;
			},
			passwordRecoveryEmailSent:function(model){
			var deferred=$q.defer();
				$http({url:'/users/email/',data:model,method:'post',headers: {'Content-Type': 'application/json'}})
				.then(function onSuccess(resp) {
				   	deferred.resolve(resp);
				  },function onError(error) {
				  	deferred.reject('Error Validating User');
				  });
				return deferred.promise;
		}
	}
}]);

