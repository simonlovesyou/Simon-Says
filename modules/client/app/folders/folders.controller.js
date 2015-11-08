'use strict';
import angular from 'angular';
import $ from 'jquery';
import db from '../db';

const FolderCtrl = ($scope) => {

  $scope.folders = db('folders').toArray();

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