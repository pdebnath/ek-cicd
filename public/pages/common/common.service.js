var eknock=eknock||angular.module('eknock');

eknock.factory('$exceptionHandler', ['$log',function($log, logErrorsToBackend) {
    return function myExceptionHandler(exception, cause) {
     // logErrorsToBackend(exception, cause);
      $log.warn(exception, cause);
    };
  }])

eknock.service('commonDataHolder', ['$log',function ($log, logErrorsToBackend) {
      this.holdData={};
}]);


