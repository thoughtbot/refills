//= require jquery.erToc
//= require jquery.glide
//= require menuAnchorAnimation
//= require_directory ./vendor
//= require_directory ./refills

$(document).ready(function() {
  $('#example').erToc({'goTopNode':'#example', 'startLevel': 'h2', 'numberedSuffix':'. '});
  $('.refills-menu-anchor').fixedsticky();
});
