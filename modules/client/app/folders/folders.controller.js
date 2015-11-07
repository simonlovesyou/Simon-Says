'use strict';
import angular from 'angular';
import $ from 'jquery';
let ipc = require('ipc');

const FolderCtrl = ($scope) => {

  //Get all folders when page loads
  ipc.send('folders', {query: 'get'});
  ipc.on('folders/get', (res) => {
    console.log(res);
    if(res.status === 200) {
      $scope.folders = res.data;
      $scope.safeApply();
    } else if(res.status === 404) {
      console.log('Could not find the folders')
    }
  });
  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase === '$apply' || phase === '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };
}

module.exports = FolderCtrl;