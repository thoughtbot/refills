$(document).ready ->
  menu = $('#navigation-menu')
  menuToggle = $('#js-mobile-menu')
  signUp = $('.sign-up')

  $(menuToggle).on 'click', (event) ->
    event.preventDefault()
    menu.slideToggle ->
      if menu.is(':hidden')
        menu.removeAttr('style')

  # underline under the active nav item
  $(".nav .nav-link").click ->
    $(".nav .nav-link").each ->
      $(this).removeClass("active-nav-item")

    $(this).addClass("active-nav-item")
    $(".nav .more").removeClass("active-nav-item")
