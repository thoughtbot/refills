$(document).ready ->
  expanderTrigger = $('.expander-trigger')
  expanderContent = $('.expander-content')
  expanderTrigger.click ->
    $(this).toggleClass 'expander-hidden'
    return
  return
