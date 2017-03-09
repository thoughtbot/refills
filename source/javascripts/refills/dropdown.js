$(function() {
  var menuSelector = '[data-dropdown=menu]';
  var toggleSelector = '[data-dropdown=toggle]';

  function closeDropdowns() {
    $(toggleSelector).attr('aria-expanded', false);
    $(menuSelector).attr('aria-hidden', true);
  }

  $(toggleSelector).on('click', function(event) {
    var button = $(event.target);
    var dropdown = $('#' + button.attr('aria-controls'));
    var isExpanded = dropdown.attr('aria-hidden') === 'false';

    closeDropdowns();

    if (!isExpanded) {
      button.attr('aria-expanded', true);
      dropdown.attr('aria-hidden', false);
    }
  });

  function parentIsMenu(element) {
    return $(element).parents(menuSelector).length > 0;
  }

  $('body').click(function(event) {
    var target = $(event.target);

    if (!(target.is(toggleSelector) || parentIsMenu(event.target))) {
      closeDropdowns();
    }
  });

  $(document).on('keyup', function(event) {
    var ESCAPE_KEY_CODE = 27;

    if(event.keyCode === ESCAPE_KEY_CODE) {
      closeDropdowns();
    }
  });
});
