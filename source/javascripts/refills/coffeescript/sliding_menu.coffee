$(document).ready ->
  $('.sliding-menu-button, .sliding-menu-fade-screen').on 'click touchstart', (e) ->
    $('.sliding-menu-content, .sliding-menu-fade-screen').toggleClass 'is-visible'
    e.preventDefault()
    return
  return
