'use strict';
import angular from 'angular';
import $ from 'jquery';
let ipc = require('ipc');

const index = {
  'folderList': '.row > .col-md-6:first-child > ul',
  'taskList': '.row > .col-md-6:nth-child(2) > ul',
  'editTaskBody': '#editTaskModal > .modal-dialog > .modal-content > .container-fluid > .row > .modal-body'
}

const TaskCtrl = ($scope) => {

  setTimeout(() => {
    console.log(getActiveFolder());
    ipc.send('tasks', {query: 'get', where: {'name': getActiveFolder().name, 'path': getActiveFolder().path}});
  }, 0);

  ipc.on('tasks/get', (res) => {
    if(res.status === 200) {
      $scope.tasks = res.data;
      $scope.safeApply();
    } else if(res.status === 404) {
      console.log('No tasks found because: "%s"', res.error);
      console.log(res);
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

module.exports = TaskCtrl;


function getActiveFolder() {
  console.log($(index.folderList).children().find('.activeFolder'));
  let folderName = $('.activeFolder').find('h3').html();
  let folderPath = $('.activeFolder').find('p').find('i').html();
  setTimeout(() => {console.log($('.activeFolder'))}, 0);

  return {
    'name': folderName,
    'path': folderPath
  }
}