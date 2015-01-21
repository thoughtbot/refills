$ ->
  $("#modal-1").on "click", ->
    if $(this).is(":checked")
      $("body").addClass "modal-open"
    else
      $("body").removeClass "modal-open"
    return

  return

