$(document).ready(function(){
  $(".dropdown-button").click(function(){
    $(".menu").toggleClass("show-menu");
    $(".menu > li").click(function(){
      $(".dropdown-button").html($(this).html());
      $(".menu").removeClass("show-menu");
    });
  });  
});
