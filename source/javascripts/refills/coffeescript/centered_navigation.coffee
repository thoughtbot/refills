$(document).ready ->
  menuToggle = $('#js-centered-navigation-mobile-menu').unbind()
  $('#js-centered-navigation-menu').removeClass 'show'
  menuToggle.on 'click', (e) ->
    e.preventDefault()
    $('#js-centered-navigation-menu').slideToggle ->
      if $('#js-centered-navigation-menu').is(':hidden')
        $('#js-centered-navigation-menu').removeAttr 'style'
      return
    return
  return
