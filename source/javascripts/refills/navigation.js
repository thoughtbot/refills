(function() {
  $(document).ready(function() {
    var menu, menuToggle, signUp;
    menu = $('#navigation-menu');
    menuToggle = $('#js-mobile-menu');
    signUp = $('.sign-up');
    $(menuToggle).on('click', function(event) {
      event.preventDefault();
      return menu.slideToggle(function() {
        if (menu.is(':hidden')) {
          return menu.removeAttr('style');
        }
      });
    });
    return $(".nav .nav-link").click(function() {
      $(".nav .nav-link").each(function() {
        return $(this).removeClass("active-nav-item");
      });
      $(this).addClass("active-nav-item");
      return $(".nav .more").removeClass("active-nav-item");
    });
  });

}).call(this);
