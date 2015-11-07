'use strict';
import angular from 'angular';
import $ from 'jquery';
import configHelper from '../api/configHelper.js';

const FolderCtrl = ($scope) => {


  configHelper.get().then((folders) => {
    $scope.folders = folders;
    $scope.safeApply();
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