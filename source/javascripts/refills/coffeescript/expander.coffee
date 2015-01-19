$(document).ready ->
  expanderTrigger = document.getElementById("js-expander-trigger")
  expanderContent = document.getElementById("js-expander-content")
  $("#js-expander-trigger").click ->
    $(this).toggleClass "expander-hidden"
    return

  return

