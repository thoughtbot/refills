$(document).ready(function() {
  parallax();
});

$(window).scroll(function(e) {
  parallax();
});

function parallax(){
  var plxBackground = $("#js-parallax-background");
  var plxWindow = $("#js-parallax-window");

  var plxWindowTopToPageTop = $(plxWindow).offset().top;
  var windowTopToPageTop = $(window).scrollTop();
  var plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;

  var plxBackgroundTopToPageTop = $(plxBackground).offset().top;
  var windowInnerHeight = window.innerHeight;
  var plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
  var plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;
  var plxSpeed = 0.35;

  plxBackground.css('top', - (plxWindowTopToWindowTop * plxSpeed) + 'px');
}
