$(document).ready ->
  $(".dropdown-button").click ->
    $button = $(this)
    $menu = $button.siblings(".dropdown-menu")
    $menu.toggleClass "show-menu"
    $menu.children("li").click ->
      $menu.removeClass "show-menu"
      $button.html $(this).html()
      return
    return
  return
