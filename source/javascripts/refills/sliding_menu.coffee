$(document).ready ->
  $('.js-menu-trigger').on 'click touchstart', (event) ->
    $('.js-menu').toggleClass('is-visible')
    $('.js-menu-screen').toggleClass('is-visible')
    event.preventDefault()

  $('.js-menu-screen').on 'click touchstart', (event) ->
    $('.js-menu').toggleClass('is-visible')
    $('.js-menu-screen').toggleClass('is-visible')
    event.preventDefault()
