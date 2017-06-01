eknock.factory('checklistModalFactory',['$http','$log','$q',function($http,$log,$q){
	return{

         getModalCheckList : function(model){

				var deferred=$q.defer();

				$http(
					{
						url:'/api/common/dashboard/checklist/modal/details',
						data : model,
						method:'post',
						headers: {'Content-Type': 'application/json'
					}})
					.then(function onSuccess(resp) {
						deferred.resolve(resp);
					},function onError(error) {
						deferred.reject('Error While Checklist');
					});

				return deferred.promise;
	   	},

		updateCheckList :function(model){

			var deferred=$q.defer();
			$http(
				{
					url:'/api/common/dashboard/checklist/modal/details/update',
					data : model,
					method:'post',
					headers: {'Content-Type': 'application/json'
				}})
			.then(function onSuccess(resp) {
			   	deferred.resolve(resp);
			  },function onError(error) {
			  	deferred.reject('Error While Updating Deal');
			  });
			return deferred.promise;
	   	},

		getSequenceByDealStatusId :function(model){
			
			var deferred=$q.defer();
			$http(
				{
					url:'/api/common/dashboard/checklist/modal/details/sequence',
					data : model,
					method:'post',
					headers: {'Content-Type': 'application/json'
				}})
			.then(function onSuccess(resp) {
			   	deferred.resolve(resp);
			  },function onError(error) {
			  	deferred.reject('Error While Fetching Sequence');
			  });
			return deferred.promise;
	   	},
		 buyerSubmitOffer :function(model){
			
			
			return modal;
	   	}

     }
}])