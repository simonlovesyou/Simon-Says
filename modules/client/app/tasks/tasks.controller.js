'use strict';
import angular from 'angular';
import $ from 'jquery';
import db from '../db';
import uuid from 'node-uuid';
import _ from 'lodash';

const index = {
  'folderList': '.row > .col-md-6:first-child > ul',
  'taskList': '.row > .col-md-6:nth-child(2) > ul',
  'editTaskBody': '#editTaskModal > .modal-dialog > .modal-content > .container-fluid > .row > .modal-body'
}

const TaskCtrl = ($scope) => {

  setTimeout(function() {
    let folder = getActiveFolder();
    $scope.tasks = db('folders').find({folder}).tasks;
    $scope.safeApply();
  }, 0);

  $('#taskSave').on('click', (event) => {

    let folder = getActiveFolder();
    let matchAll = ($('#taskMatch').val() === 'all');

    var values = {
      'id':         uuid(),
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

    db('folders')
    .find({folder})
    .tasks.push(values);
  });

  $('form').submit((event) => {
    event.preventDefault();
  });

  setTimeout(() => {
    $('#taskList > li').each((index, li) => {
      console.log($(li));
      $(li).on('click', () => {
        $('#editTaskModal').modal();
        let folder = getActiveFolder();
        let id = $(li).find('.id').html()
        let task = db('folders').find({folder}).tasks.filter(task => (task.id === id))[0];


        $('#formEditTask input').each((index, val) => {
          if($(val).attr('id') === 'taskName') {
            $(val).val(task.name);
          } else if($(val).attr('id') === 'taskDescription') {
            $(val).val(task.description);
          } else if($(val).attr('id') === 'taskInterval') {
            $(val).val(task.interval);
          }
        });

        $('#editTaskMatch').val(task.matchAll ? 'all' : 'any');

        task.rules.forEach(rule => {
          addRule($('#editRuleList'));
        });

        $('#editRuleList li').each((index, li) => {
          let selects = $(li).children('select');
          let input = $(li).children('input');

          let type = task.rules[index].type;
          let comparator = task.rules[index].comparator;
          let reference = task.rules[index].reference;

          if(type === 'filename') {
            type = 'name';
          }
          $($(selects).get(0)).val(type);
          $($(selects).get(1)).val(comparator);

          $(input).val(reference);

        })

      })
    })
  }, 0);





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

function addRule(ulList) {
  //Make these into inputs instead
  ulList.append('<li>'+
                  '<button role="button" class="pull-left btn btn-danger"> - </button>'+
                  '<select class="col-md-3" form="formTask">'+
                    '<option value="name"> Filename </option>'+
                    '<option value="extension"> Extension </option>'+
                  '</select>'+
                  '<select class="col-md-3" form="formTask">'+
                    '<option value="equals"> Equals </option>'+
                    '<option value="contains"> Contains </option>'+
                    '<option value="doesNotEquals"> Does not equals </option>'+
                    '<option value="doesNotContain"> Does not contain </option>'+
                  '</select>'+
                  '<input type="text" placeholder="Match">'+
                '</li>');
}

module.exports = TaskCtrl;