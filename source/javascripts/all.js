//= require_tree .

$(document).ready(function() {
  $('#example').erToc({'goTopNode':'#example', 'startLevel': 'h2', 'numberedSuffix':'. '});
  $('.refills-menu-anchor').fixedsticky();
});
