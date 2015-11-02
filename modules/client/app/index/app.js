// Declare app level module which depends on filters, and services
import angular from 'angular';
import ngRoute from 'angular-route'
import FolderCtrl from '../folders/folders.js';
import TaskCtrl from '../tasks/tasks.js';
import path from 'path';
import fs from 'fs';

let simonSays = angular.module('SimonSays', ['ngRoute']);

console.log(simonSays);

/*simonSays.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'index.html'
      //,
      //controller: IndexCtrl
    })
    .when('/folders', {
      templateUrl: '../folders/folders.html',
      controller: 'FoldersCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
}]);*/
