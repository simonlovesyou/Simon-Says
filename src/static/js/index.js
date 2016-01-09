'use strict';
//# sourceMappingURL=main.map
window.$ = window.jQuery = require('jquery');
$(document).ready(function() {
  let Folders = require('../../components/Folders/Folders.js');
  let ModalAddFolder = require('../../components/Modals/ModalAddFolder.js');
  let ModalAddTask = require('../../components/Modals/ModalAddTask.js');
})


/*//Look up index for HTMLElements
const index = {
  'folderList': '.row > .col-md-6:first-child > ul',
  'taskList': '.row > .col-md-6:nth-child(2) > ul',
  'editTaskBody': '#editTaskModal > .modal-dialog > .modal-content > .container-fluid > .row > .modal-body'
}

$(document).ready(function() {
  //When clicking on 'Save Changes' in the new 'Folder' modal
  $('#folderSave').on('click', function() {
    $.ajax({
      url: '/api/folders/add',
      type: 'post',
      data: {'folder': $('#folderName').val()},
      statusCode: {
        200: function(res) {
          console.log('Valid directory!');
        },
        201: function(res) {
          console.log('Valid directory!');
        },
        400: function(res) {
          console.log('Not a valid directory!');
        },
        420: function(res) {
          console.log('Not a valid directory');
        }
      }
    });
  });

  $('#foldersButton')
  .on('click', () => {
    ipc.send('goto-folders', {});
  });

  ipc
  .on('render-folders', data => {
    //$scope.folder = data;

    // this will print incorrect result
    console.log(data);
  });

  //When clicking on 'Save Changes' in the 'Edit Task' modal
  $('#saveTaskEdit').on('click', () => {

    let folder = getActiveFolder();
    let rules = [];

    $('#editTaskRuleList').children().each(function() {
      let selects = $(this).find('select');
      let self = this;
      //Add each rule
      rules.push({
        'type':       $(selects[0]).val(),
        'comparator': $(selects[1]).val(),
        'reference':  $(self).find('input').val()
      });
    });


    $.ajax({
      url: '/api/tasks/edit',
      type: 'post',
      dataType: 'json',
      data: {
        'folderName': folder.name,
        'folderPath': folder.path,
        'taskName': $('#editTaskName').val(),
        'taskDescription': $('#editTaskDescription').val(),
        'matchAll': $('#editTaskMatch').val() === 'All',
        'interval': $('#editTaskInterval').val(),
        'rules': JSON.stringify(rules)
      },
      statusCode: {
        200: (res => {
          console.log('Task saved!');
        })
      }
    });
  });
  setTaskClickEvent();
});





function setTaskClickEvent() {
   //When clicking on a 'Task'
  $(index.taskList).children('li').on('click', function() {

    $('#editTaskModal').modal('show');

    let id = $(this).children('p').html();
    let folder = getActiveFolder();

    let query = $.param({
      'taskId': id,
      'folderName': folder.name,
      'folderPath': folder.path
    });

    $.ajax({
      url: '/api/tasks/get?'+query,
      type: 'get',
      statusCode: {
        200: (res => {
          $(index.taskList).empty();
          let task = JSON.parse(res)[0];
          let inputs = $(index.editTaskBody).find('input');

          $(inputs[0]).val(task.name);
          $(inputs[1]).val(task.description);
          $(inputs[2]).val(task.interval);

          $(task.rules).each(() => {
            addRule($('#editTaskRuleList'));

            let lastEntry = $('#editTaskRuleList').children('li:last-child')
            let selects = lastEntry.find('select');
            let input = lastEntry.find('input');

            $(selects[0]).val(this.type);
            $(selects[1]).val(this.comparator);
            $(input).val(this.reference);
          });
          //});
        })
      }
    });
  })
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

function getActiveFolder() {
  let folderName = $(index.folderList).children().find('.active-folder').find('h3').html();
  let folderPath = $(index.folderList).children().find('.active-folder').find('p').find('i').html();

  return {
    'name': folderName,
    'path': folderPath
  }
}
*/
