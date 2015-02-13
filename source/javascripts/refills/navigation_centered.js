$(document).ready(function() {
  var menuToggle = $('#js-navigation-centered-mobile-menu').unbind();
  $('#js-navigation-centered-menu').removeClass("show");
  
  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-centered-menu').slideToggle(function(){
      if($('#js-navigation-centered-menu').is(':hidden')) {
        $('#js-navigation-centered-menu').removeAttr('style');
      }
    });
  });
});
