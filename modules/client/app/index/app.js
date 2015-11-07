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