//# sourceMappingURL=main.map
let ipc = require('ipc');
window.$ = window.jQuery = require('jquery');


//Look up index for HTMLElements
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

  //When clicking a folder in the folder list
  $(index.folderList).children().each(function() {
    $(this).on('click', function() {

      $(this).siblings().find('div').removeClass('active-folder');
      $(this).find('div').addClass('active-folder');

      let folder = getActiveFolder();

      let query = $.param({
        'folderName': folder.name,
        'folderPath': folder.path
      });

      $.ajax({
        url: '/api/tasks/get?'+query,
        type: 'get',
        statusCode: {
          200: (res => {
            $(index.taskList).empty();
            $(JSON.parse(res)).each(function() {
              console.log('Success!');
              $(index.taskList).append( '<li>'+
                                          '<p>'+this.id+'</p>'+
                                          '<h4>'+this.name+'</h4>'+
                                          '<p> <i>'+this.description+'</i> </p>'+
                                        '</li>'
                                      );
            });
            setTaskClickEvent();
          })
        }
      });
    });
  });

  //When clicking on 'Add rule' in the 'Add task' modal
  $('#addRule').on('click', () => {
    console.log($('#ruleList'));
    addRule($('#ruleList'));

    //Add eventlistener on each new delete button
    $('#ruleList').last().find('button').each(() => {
      $(this).on('click', function() {
        $(this).parent().remove();
      })
    });
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
  ulList.append('<li>'+
                  '<button role="button" class="pull-left btn btn-danger"> - </button>'+
                  '<select class="col-md-3">'+
                    '<option value="name"> Filename </option>'+
                    '<option value="extension"> Extension </option>'+
                  '</select>'+
                  '<select class="col-md-3">'+
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

