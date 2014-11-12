(function() {
  var refillsMenuAnchor = $('.refills-menu-anchor');

  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      refillsMenuAnchor.addClass('refills-menu-anchor-moved');
    } else if ($(this).scrollTop() <= 50) {
      refillsMenuAnchor.removeClass('refills-menu-anchor-moved');
    }
  });
})();
