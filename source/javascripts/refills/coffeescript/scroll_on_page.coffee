do (jQuery) ->
  jQuery.mark = jump: (options) ->
    defaults = selector: 'a.scroll-on-page-link'
    if typeof options == 'string'
      defaults.selector = options
    options = jQuery.extend(defaults, options)
    jQuery(options.selector).click (e) ->
      jumpobj = jQuery(this)
      target = jumpobj.attr('href')
      thespeed = 1000
      offset = jQuery(target).offset().top
      jQuery('html,body').animate { scrollTop: offset }, thespeed, 'swing'
      e.preventDefault()
      return
  return
jQuery ->
  jQuery.mark.jump()
  return
