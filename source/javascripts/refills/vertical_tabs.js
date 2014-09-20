(function() {
  $(".js-vertical-tab-content").hide();

  $(".js-vertical-tab-content:first").show();

  $(".js-vertical-tab").click(function(event) {
    var activeTab;
    event.preventDefault();
    $(".js-vertical-tab-content").hide();
    activeTab = $(this).attr("rel");
    $("#" + activeTab).show();
    $(".js-vertical-tab").removeClass("is-active");
    $(this).addClass("is-active");
    $(".js-vertical-tab-accordion-heading").removeClass("is-active");
    return $(".js-vertical-tab-accordion-heading[rel^='" + activeTab + "']").addClass("is-active");
  });

  $(".js-vertical-tab-accordion-heading").click(function(event) {
    var accordion_activeTab;
    event.preventDefault();
    $(".js-vertical-tab-content").hide();
    accordion_activeTab = $(this).attr("rel");
    $("#" + accordion_activeTab).show();
    $(".js-vertical-tab-accordion-heading").removeClass("is-active");
    $(this).addClass("is-active");
    $(".js-vertical-tab").removeClass("is-active");
    return $(".js-vertical-tab[rel^='" + accordion_activeTab + "']").addClass("is-active");
  });

}).call(this);
