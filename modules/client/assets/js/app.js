// Declare app level module which depends on filters, and services
import angular from 'angular';  

var simonSays = angular.module('SimonSays', []);


/*simonSays.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '../client/index/index.html'
      //,
      //controller: IndexCtrl
    })
    .when('/folders', {
      templateUrl: '../client/folders/folders.html',
      controller: 'FoldersCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
  }]);
*/