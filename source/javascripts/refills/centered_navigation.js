(function() {
  $(document).ready(function() {
    var menu, menuToggle, signUp;
    menu = $('.centered-navigation-menu');
    menuToggle = $('.centered-navigation-menu-button');
    signUp = $('.sign-up');
    return $(menuToggle).on('click', function(event) {
      event.preventDefault();
      return menu.slideToggle(function() {
        if (menu.is(':hidden')) {
          return menu.removeAttr('style');
        }
      });
    });
  });

}).call(this);
