$(function() {
  $('[data-toggle-snippets]').each(function(_index, element) {
    var button = $(element);
    var snippetName = button.attr('aria-controls');
    var snippets = $('#' + snippetName);

    button.css('display', 'block');
    snippets.attr('aria-hidden', 'true');
    snippets.attr('aria-labelledby', 'toggle-' + snippetName);
  });

  $('[data-toggle-snippets]').on('click', function() {
    var button = $(this);
    var snippets = $('#' + button.attr('aria-controls'));
    var isExpanded = snippets.attr('aria-hidden') === 'false';

    if(isExpanded) {
      button.text('Show Code');
    } else {
      button.text('Hide Code');
    }

    button.attr('aria-expanded', !isExpanded);
    snippets.attr('aria-hidden', isExpanded);
  });
});
