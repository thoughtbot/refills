$(function() {
  var animationClasses = 'animated alternate iteration zoomOut';
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  $('.animate-trigger').on('click',function() {
    $('.animate-target').addClass(animationClasses).one(animationEnd,function() {
      $(this).removeClass(animationClasses);
    });
  });
});
