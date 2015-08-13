var index = {
  'folderList': '.row > .col-md-6:first-child > ul',
  'taskList': '.row > .col-md-6:nth-child(2) > ul'
}



$(document).ready(function() {
  $('#folderSave').on('click', function() {

    $.post('/api/folders/add/', {"folder": $('#folderName').val()})
    .done(function() {
      console.log("Valid directory!");
    })
    .fail(function() {
      console.log("Not valid directory!");
    });
  });
});