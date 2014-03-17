//= require prism
//= require ZeroClipboard.min
//= require smooth-scroll
//= require_tree .


$(document).ready(function() {
    $('#example1').erToc({'goTopNode':'#example1', 'startLevel': 'h2', 'numberedSuffix':'. '});
    $('#example2').erToc({'goTopNode':'#example2', 'startLevel': 'h2', 'toc<a href="http://www.jqueryscript.net/tags.php?/Scroll/">Scroll</a>': false});
    $('#example3').erToc({'goTopNode':'#example3', 'startLevel': 'h2', 'numbered': false, 'tocClass': 'er_toc er_toc_disc'});
});
