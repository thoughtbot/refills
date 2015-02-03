$(document).ready(function(){
  $('.sliding-menu-button, .sliding-menu-fade-screen').on('click touchstart',function (e) {
    $('.sliding-menu-content, .sliding-menu-fade-screen').toggleClass('is-visible');
    e.preventDefault();
  });
});
