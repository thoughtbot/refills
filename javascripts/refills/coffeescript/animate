(function() {
  $(function() {
    var animationClasses, animationEnd;
    animationClasses = 'animated alternate iteration zoomOut';
    animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $('.animate-trigger').on('click', function() {
      $('.animate-target').addClass(animationClasses).one(animationEnd, function() {
        $(this).removeClass(animationClasses);
      });
    });
  });

}).call(this);
