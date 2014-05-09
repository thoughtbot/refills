(function($) {
  $.fn.clickToggle = function(func1, func2) {
    var funcs = [func1, func2];
    this.data('toggleclicked', 0);
    this.click(function() {
      var data = $(this).data();
      var tc = data.toggleclicked;
      $.proxy(funcs[tc], this)();
      data.toggleclicked = (tc + 1) % 2;
    });
    return this;
  };
}(jQuery));

$(document).ready(function () {
  $('.js-dropdown-link').clickToggle(function() {
    var menu = $(this).siblings('.js-dropdown-menu');
    menu.css('top', $(this).outerHeight() + 15);
    menu.fadeIn(150);
    $(this).addClass("is-active");
  }, function() {
    var menu = $(this).siblings('.dropdown-menu');
    menu.fadeOut(150);
    $(this).removeClass("is-active");
  });
});
