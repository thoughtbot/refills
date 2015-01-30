(function() {
  $(function() {
    $("#modal-1").on("click", function() {
      if ($(this).is(":checked")) {
        $("body").addClass("modal-open");
      } else {
        $("body").removeClass("modal-open");
      }
    });
    $(".modal-window").on("click", function() {
      $(".modal-state:checked").prop("checked", false).change();
    });
    $(".modal-inner").on("click", function(e) {
      e.stopPropagation();
    });
  });

}).call(this);
