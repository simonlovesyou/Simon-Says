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


  $('form').submit((event) => {
    event.preventDefault();
  })
  
  $('#taskSave').on('click', (event) => {

    let folder = getActiveFolder();
    let matchAll = ($('#taskMatch').val() === 'all');

    var values = {
      'folderName': folder.name,
      'folderPath': folder.path,
      'matchAll':   matchAll
    };


    values.rules = [];
    $.each($('#formTask').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    $('li > select').parent().each((index, value) => {

      let selects = $(value).find('select');
      values.rules.push({
        'type':       $(selects[0]).val(),
        'comparator': $(selects[1]).val(),
        'reference':  $(value).find('input').val()
      });
    });

    ipc.send('tasks', {query: 'add', values});

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

module.exports = TaskCtrl;