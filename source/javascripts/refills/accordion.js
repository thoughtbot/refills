(function() {
  $('.js-accordion-trigger').bind('click', function(event) {
    $(this).parent().find('.submenu').slideToggle('fast');
    $(this).parent().toggleClass('is-expanded');
    return event.preventDefault();
  });

}).call(this);
