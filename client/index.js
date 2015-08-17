var index = {
  'folderList': '.row > .col-md-6:first-child > ul',
  'taskList': '.row > .col-md-6:nth-child(2) > ul'
}

$(document).ready(function() {
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

  $('#taskSave').on('click', function() {
    console.log("Jag trycks");
    console.log($(index.folderList).children().find('.active-folder'));
    var folderName = $(index.folderList).children().find('.active-folder').find('h3').html();
    var folderPath = $(index.folderList).children().find('.active-folder').find('p').find('i').html();
    console.log("Foldername: %s, folderpath: %s", folderName, folderPath);
    $.ajax({
      url: '/api/tasks/add',
      type: 'post',
      data: {
        "folderName": folderName,
        "folderPath": folderPath,
        "taskName": $('#taskName').val(),
        "taskDescription": $('#taskDescription').val()
      },
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

  $(index.folderList).children().each(function() {
    $(this).on('click', function() {
      console.log($(this).siblings());
      $(this).siblings().find('div').removeClass('active-folder');
      $(this).find('div').addClass('active-folder');
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

