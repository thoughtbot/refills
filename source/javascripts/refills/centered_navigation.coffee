$(document).ready ->
  menu = $('.centered-navigation-menu')
  menuToggle = $('.centered-navigation-menu-button')
  signUp = $('.sign-up')

  $(menuToggle).on 'click', (event) ->
    event.preventDefault()
    menu.slideToggle ->
      if menu.is(':hidden')
        menu.removeAttr('style')
