$(function() {
  var uah_min = $("#user_age_handler_min");
  var uah_max = $("#user_age_handler_max");
$("#user_age").slider({
  range: true,
  min: 0,
  max: 1000,
  values: [0, 1000],
  create: function() {
   uah_min.text(0);
    uah_max.text(1000);
  },
  slide: function(event, ui) {
    $("#user_age_min").val(ui.values[0]);
    $("#user_age_max").val(ui.values[1]);
    uah_min.text( ui.values[0] );
    uah_max.text( ui.values[1] );
  }
});
});


// Dropdown list
