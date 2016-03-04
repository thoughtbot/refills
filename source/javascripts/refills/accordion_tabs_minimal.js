$(document).ready(function () {
  $('.accordion-tabs-minimal').each(function(index) {
    $(this).children('li').each(function() {
      $a = $(this).find('a')
      if ($a.hasClass('is-active')) {
        $a.addClass('is-active').next().addClass('is-open').show();
      }
    })
  });
  $('.accordion-tabs-minimal').on('click', 'li > a.tab-link', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.accordion-tabs-minimal');
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
    }
  });
});
