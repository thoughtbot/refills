(function() {
  $('.accordion-base-trigger').bind('click', function(e) {
    jQuery(this).parent().find('.submenu').slideToggle('fast');
    jQuery(this).parent().toggleClass('is-expanded');
    e.preventDefault();
  });

}).call(this);
