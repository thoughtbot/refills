$(document).ready ->
  $(".dropdown-button").click ->
    $(".menu").toggleClass("show-menu")
    $(".menu > li").click ->
      $(".dropdown-button").html($(this).html())
      $(".menu").removeClass("show-menu")
