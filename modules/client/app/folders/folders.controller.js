'use strict';
import angular from 'angular';
import $ from 'jquery';
let ipc = require('ipc');

const FolderCtrl = ($scope) => {

  ipc.send('folders', {query: 'get'});
  ipc.on('folders/get', (res) => {
    if(res.status === 200) {
      $scope.folders = res.data.folders;
      $scope.safeApply();
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