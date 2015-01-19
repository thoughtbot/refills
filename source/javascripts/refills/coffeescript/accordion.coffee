$(".js-accordion-trigger").bind "click", (e) ->
  jQuery(this).parent().find(".submenu").slideToggle "fast" # apply the toggle to the ul
  jQuery(this).parent().toggleClass "is-expanded"
  e.preventDefault()
  return

