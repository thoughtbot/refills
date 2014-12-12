$(document).ready(function() {
  $('#js-navigation-menu').removeClass("show");

  $('#js-mobile-menu').on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
      }
    });
  });
});
