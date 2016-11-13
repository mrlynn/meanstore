
$(document).ready(function() {

// process the form
$('form').submit(function(event) {

  // remove the past errors
  $('#name-group').removeClass('has-error');
  $('#name-group .help-block').empty();
  $('#superhero-group').removeClass('has-error');
  $('#superhero-group .help-block').empty();

  // remove success messages
  $('#messages').removeClass('alert alert-success').empty();

  // get the form data
  var formData = {
      'name'              : $('input[name=name]').val(),
      'superheroAlias'    : $('input[name=superheroAlias]').val()
  };

  // process the form
  $.ajax({
    type        : 'POST',
    url         : 'process.php',
    data        : formData,
    dataType    : 'json',
    success     : function(data) {

      // log data to the console so we can see
      console.log(data);

      // if validation fails
      // add the error class to show a red input
      // add the error message to the help block under the input
      if ( ! data.success) {

        if (data.errors.name) {
          $('#name-group').addClass('has-error');
          $('#name-group .help-block').html(data.errors.name);
        }

        if (data.errors.superheroAlias) {
          $('#superhero-group').addClass('has-error');
          $('#superhero-group .help-block').html(data.errors.superheroAlias);
        }

      } else {

        // if validation is good add success message
        $('#messages').addClass('alert alert-success').append('<p>' + data.message + '</p>');
      }
    }
  });

  // stop the form from submitting and refreshing
  event.preventDefault();
});

});
