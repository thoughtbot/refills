$('.js-accordion-trigger').bind 'click', (event) ->
  $(this).parent().find('.submenu').slideToggle('fast')  # apply the toggle to the ul
  $(this).parent().toggleClass('is-expanded')
  event.preventDefault()
