(function() {
  $(document).ready(function() {
    return $(".dropdown-button").click(function() {
      $(".menu").toggleClass("show-menu");
      return $(".menu > li").click(function() {
        $(".dropdown-button").html($(this).html());
        return $(".menu").removeClass("show-menu");
      });
    });
  });

}).call(this);
