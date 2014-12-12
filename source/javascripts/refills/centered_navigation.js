$(document).ready(function() {
  $('#js-centered-navigation-menu').removeClass("show");
  
  $('#js-centered-navigation-mobile-menu').on('click', function(e) {
    e.preventDefault();
    $('#js-centered-navigation-menu').slideToggle(function(){
      if($('#js-centered-navigation-menu').is(':hidden')) {
        $('#js-centered-navigation-menu').removeAttr('style');
      }
    });
  });
});
