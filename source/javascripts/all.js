//= require prism
//= require ZeroClipboard.min
//= require smooth-scroll
//= require fixedsticky
//= require_tree .


$(document).ready(function() {
    $('#example').erToc({'goTopNode':'#example', 'startLevel': 'h2', 'numberedSuffix':'. '});
    $( '.refills-menu-anchor' ).fixedsticky();
});
