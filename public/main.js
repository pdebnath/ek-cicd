var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
<<<<<<< Updated upstream
  return $window._; 
}]);

var eknock=angular.module('eknock',['ui.router','ui.bootstrap','oc.lazyLoad','underscore']);
=======
  return $window._; // assumes underscore has already been loaded on the page
}]);

var eknock=angular.module('eknock',['ui.router','oc.lazyLoad','underscore']);
>>>>>>> Stashed changes

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
	.state('search',{
		url:'/search',
		templateUrl:'pages/search/search.html',
		controller:'SearchController'
	})
	$urlRouterProvider.otherwise('/homeowner');
}]);


eknock.run(function($timeout){
	$timeout(function(){
        $.material.init();
    },1000)	
})

/*
eknock.config(function ($ocLazyLoadProvider) {
	$ocLazyLoadProvider.config({
	    debug: false,
	    events: true,
	    modules: [{
	        name: "ui.bootstrap",
	        files: [
	      "bower_components/angular-bootstrap/ui-bootstrap-tpls.js"
	    ],
	  }]
	});
})*/
