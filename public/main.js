var eknock=angular.module('eknock',['ui.router']);

eknock.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
	
	$stateProvider.state('login',{
		url:'/login',
		templateUrl:'pages/user/user-login.html',
		controller:'userController'
	}).state('email',{
		url:'/email',
		templateUrl:'pages/user/password-reset-email.html',
		controller:'userController'
	}).state('register',{
		url:'/register',
		templateUrl:'pages/user/user-register.html',
		controller:'userController'
	}).state('dashboard',{
		url:'/dashboard/:userid',
		templateUrl:'pages/dashboard/dashboard.html',
		controller:'dashboardController'
	}).state('homeowner',{
		url:'/homeowner',
		templateUrl:'pages/dashboard/homeowner/home-owner.html',
		controller:'HomeOwnerController'
	})

	$urlRouterProvider.otherwise('/homeowner');
}])

