$(document).ready(function() {
  var expanderTrigger = $(".expander-trigger");
  var expanderContent = $(".expander-content");

  expanderTrigger.click(function(){
    $(this).toggleClass("expander-hidden");
  });
});
