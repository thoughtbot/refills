$(window).resize(function() {
  var more = document.getElementById("js-centered-more");
  var windowWidth = $(window).width();
  var moreLeftSideToPageLeftSide = $(more).offset().left;
  var moreLeftSideToPageRightSide = windowWidth - moreLeftSideToPageLeftSide;

  if (moreLeftSideToPageRightSide < 330) {
    $('#js-centered-more .submenu .submenu').removeClass("fly-out-right");
    $('#js-centered-more .submenu .submenu').addClass("fly-out-left");
  }

  if (moreLeftSideToPageRightSide > 330) {
    $('#js-centered-more .submenu .submenu').removeClass("fly-out-left");
    $('#js-centered-more .submenu .submenu').addClass("fly-out-right");
  }
});

$(document).ready(function() {
  $(window).trigger('resize');
  var menuToggle = $('#js-centered-navigation-mobile-menu').unbind();
  $('#js-centered-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-centered-navigation-menu').slideToggle(function(){
      if($('#js-centered-navigation-menu').is(':hidden')) {
        $('#js-centered-navigation-menu').removeAttr('style');
      }
    });
  });
}); 
