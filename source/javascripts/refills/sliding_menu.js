$(document).ready(function(){
  $('.js-menu-trigger,.js-menu-screen').on('click touchstart',function (e) {
    $('.js-menu,.js-menu-screen').toggleClass('is-visible');
    e.preventDefault();
  });
});
