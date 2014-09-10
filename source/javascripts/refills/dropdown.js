$(document).ready(function(){
  $('.dropdown-button').click(function(){
    $('.menu').toggleClass('show-menu');
    $('.menu > li').click(function(){
      $('.menu').removeClass('show-menu');
    });
    // simulate a select tag by showing selected value
    // instead of placeholder when a value is selected.
    $('.menu.select > li').click(function(){
      $('.dropdown-button').html($(this).html());
    });
  });
});
