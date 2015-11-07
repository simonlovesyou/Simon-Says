// Declare app level module which depends on filters, and services
import angular from 'angular';
import ngRoute from 'angular-route'
import FolderCtrl from '../../app/folders/folders.js';
import TaskCtrl from '../tasks/tasks.js';
import path from 'path';
import fs from 'fs';

let simonSays = angular.module('SimonSays', ['ngRoute']);

simonSays
.controller('FolderCtrl', ['$scope', FolderCtrl])
.controller('TaskCtrl', ['$scope', TaskCtrl]);

/*simonSays
.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
  console.log("Går in här");
  $routeProvider
  .when('/', {
    templateUrl: 'index.html'
    //,
    //controller: IndexCtrl
  })
  .when('/folders', {
    templateUrl: fs.readFileSync(path.join(__dirname, '../folders/folders.html')),
    controller: FolderCtrl()
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
}]);*/

