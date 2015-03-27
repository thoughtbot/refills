$('.base-accordion-trigger').bind 'click', (e) ->
  jQuery(this).parent().find('.submenu').slideToggle 'fast'
  jQuery(this).parent().toggleClass 'is-expanded'
  e.preventDefault()
  return
