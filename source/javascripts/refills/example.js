$(function() {
  $("button").click(function() {
    var $button, $menu;
    $button = $(this);
    $menu = $button.siblings(".example");
    $menu.toggleClass("is-open");
  });
});
