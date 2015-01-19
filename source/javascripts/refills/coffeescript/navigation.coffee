$(document).ready ->
  menuToggle = $("#js-mobile-menu").unbind()
  $("#js-navigation-menu").removeClass "show"
  menuToggle.on "click", (e) ->
    e.preventDefault()
    $("#js-navigation-menu").slideToggle ->
      $("#js-navigation-menu").removeAttr "style"  if $("#js-navigation-menu").is(":hidden")
      return

    return

  return

