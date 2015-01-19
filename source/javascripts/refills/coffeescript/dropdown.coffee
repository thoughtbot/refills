$(document).ready ->
  $(".dropdown-button").click ->
    $(".dropdown-menu").toggleClass "show-menu"
    $(".dropdown-menu > li").click ->
      $(".dropdown-menu").removeClass "show-menu"
      return

    $(".dropdown-menu.dropdown-select > li").click ->
      $(".dropdown-button").html $(this).html()
      return

    return

  return

