(function() {
  $(document).ready(function() {
    $('.js-menu-trigger').on('click touchstart', function(event) {
      $('.js-menu').toggleClass('is-visible');
      $('.js-menu-screen').toggleClass('is-visible');
      return event.preventDefault();
    });
    return $('.js-menu-screen').on('click touchstart', function(event) {
      $('.js-menu').toggleClass('is-visible');
      $('.js-menu-screen').toggleClass('is-visible');
      return event.preventDefault();
    });
  });

}).call(this);
