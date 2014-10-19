(function() {
  $(document).ready(function() {
    $('.accordion-tabs-minimal').each(function() {
      return $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
    });
    return $('.accordion-tabs-minimal').on('click', 'li > a', function(event) {
      var accordionTabs;
      if (!$(this).hasClass('is-active')) {
        event.preventDefault();
        accordionTabs = $(this).closest('.accordion-tabs-minimal');
        accordionTabs.find('.is-open').removeClass('is-open').hide();
        $(this).next().toggleClass('is-open').toggle();
        accordionTabs.find('.is-active').removeClass('is-active');
        return $(this).addClass('is-active');
      } else {
        return event.preventDefault();
      }
    });
  });

}).call(this);
