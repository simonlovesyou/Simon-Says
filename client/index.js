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

    var folderName = $(index.folderList).children().find('.active-folder').find('h3').html();
    var folderPath = $(index.folderList).children().find('.active-folder').find('p').find('i').html();
    var rules = [];

    $('#ruleList').children().each(function() {
      var selects = $(this).find('select');
      var self = this;

      rules.push({
        "type": $(selects[0]).val(),
        "comparator": $(selects[1]).val(),
        "reference": $(self).find('input').val()
      });
    });


    $.ajax({
      url: '/api/tasks/add',
      type: 'post',
      dataType: 'json',
      data: {
        "folderName": folderName,
        "folderPath": folderPath,
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

  $(index.folderList).children().each(function() {
    $(this).on('click', function() {
      console.log($(this).siblings());
      $(this).siblings().find('div').removeClass('active-folder');
      $(this).find('div').addClass('active-folder');

      var folderName = $(index.folderList).children().find('.active-folder').find('h3').html();
      var folderPath = $(index.folderList).children().find('.active-folder').find('p').find('i').html();

      var query = $.param({
        "folderName": folderName,
        "folderPath": folderPath
      });

      console.log(query);

      $.ajax({
        url: '/api/tasks/get?'+query,
        type: 'get',
        statusCode: {
          200: function(res) {
            console.log("Loaded tasks!");
            console.log(JSON.parse(res)[0]);

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

