
//Look up index for HTMLElements
var index = {
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
      data: {"folder": $('#folderName').val()},
      statusCode: {
        200: function(res) {
          console.log("Valid directory!");
        },
        201: function(res) {
          console.log("Valid directory!");
        },
        400: function(res) {
          console.log("Not a valid directory!");
        },
        420: function(res) {
          console.log("Not a valid directory");
        }
      }
    });
  });

  //When clicking on 'Save Changes' in the 'New Task' modal
  $('#taskSave').on('click', function() {

    var folder = getActiveFolder();
    var rules = [];

    $('#ruleList').children().each(function() {
      var selects = $(this).find('select');
      var self = this;

      //Add each rule
      rules.push({
        "type":       $(selects[0]).val(),
        "comparator": $(selects[1]).val(),
        "reference":  $(self).find('input').val()
      });
    });


    $.ajax({
      url: '/api/tasks/add',
      type: 'post',
      dataType: 'json',
      data: {
        "folderName": folder.name,
        "folderPath": folder.path,
        "taskName": $('#taskName').val(),
        "taskDescription": $('#taskDescription').val(),
        "matchAll": $('#taskMatch').val() === 'All',
        "interval": $('#taskInterval').val(),
        "rules": JSON.stringify(rules)
      },
      statusCode: {
        200: function(res) {
          console.log("Task saved!");
        }
      }
    });
  });

  //When clicking a folder in the folder list
  $(index.folderList).children().each(function() {
    $(this).on('click', function() {

      $(this).siblings().find('div').removeClass('active-folder');
      $(this).find('div').addClass('active-folder');

      var folder = getActiveFolder();

      var query = $.param({
        "folderName": folder.name,
        "folderPath": folder.path
      });

      $.ajax({
        url: '/api/tasks/get?'+query,
        type: 'get',
        statusCode: {
          200: function(res) {
            $(index.taskList).empty();
            $(JSON.parse(res)).each(function() {
              console.log("Success!");
              $(index.taskList).append( '<li>'+
                                          '<p>'+this.id+'</p>'+
                                          '<h4>'+this.name+'</h4>'+
                                          '<p> <i>'+this.description+'</i> </p>'+
                                        '</li>'
                                      );
              
            });
            setTaskClickEvent();
          }
        }
      });
    });
  });

  $('#addRule').on('click', function() {
    console.log($('#ruleList'));
    $('#ruleList')
    .append('<li>'+
              '<button role="button" class="pull-left btn btn-danger"> - </button>'+
              '<select class="col-md-3">'+
                '<option value="filename"> Filename </option>'+
                '<option value="extension"> Extension </option>'+
              '</select>'+
              '<select class="col-md-3">'+
                '<option value="equals"> Equals </option>'+
                '<option value="contains"> Contains </option>'+
                '<option value="doesNotEquals"> Does not equals </option>'+
                '<option value="doesNotContain"> Does not contain </option>'+
              '</select>'+
              '<input type="text" placeholder="Match">'+
            '</li>'
            );

    //Add eventlistener on each new delete button
    $('#ruleList').last().find('button').each(function() {
      $(this).on('click', function() {
        $(this).parent().remove();
      })
    })
    });
});

function getActiveFolder() {
  var folderName = $(index.folderList).children().find('.active-folder').find('h3').html();
  var folderPath = $(index.folderList).children().find('.active-folder').find('p').find('i').html();

  return {
    "name": folderName,
    "path": folderPath
  }
}

