$ ->
  animationClasses = "animated alternate iteration zoomOut"
  animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend"
  $(".animate-trigger").on "click", ->
    $(".animate-target").addClass(animationClasses).one animationEnd, ->
      $(this).removeClass animationClasses
      return

    return

  return

