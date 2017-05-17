var eknock=eknock||angular.module('eknock');

eknock.controller('userController', ['$scope','$location','$state','userFactory', function($scope,$location,$state,userFactory){
	
	$scope.loginChecking=function(){
		$scope.model={
			email:$scope.email,
			password:$scope.password
		}
		userFactory.loginChekingFactory($scope.model).then(function(resp){
			if(resp.data.status===0){
				$scope.error=resp.data.message;
			}else if(resp.data.status===1){
				//dataStoreService.setData(resp.data.jsonresp);
				$state.go('dashboard',{userid:1});
			}else{
				$state.go('login');
			}
		})
	}

	$scope.loginRegister=function(){
		$scope.model={
			username:$scope.userName,
			email:$scope.email,
			password:$scope.password,
			password_confirmation:$scope.confirmPassword
		}
		userFactory.userRegister($scope.model).then(function(resp){
			if(resp.data.status===0){
				$scope.error=resp.data.message;
			}else if(resp.data.status===1){
				$state.go('login');
			}else{
				$state.go('register');
			}
		})

	}

	$scope.passwordRecoveryEmailSent=function(){
		$scope.model={email:$scope.email}
		userFactory.passwordRecoveryEmailSent($scope.model).then(function(resp){
			if(resp.data.status===1){
				$state.go('login');
			}else{
				$scope.error=resp.data.meaasge;
			}
		})
   }
	
}]);