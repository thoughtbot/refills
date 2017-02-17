$(function() {
  var modalSelector = '[data-modal]';
  var openModalSelector = '[data-open-modal]';
  var closeModalSelector = '[data-close-modal]';

  $(openModalSelector).on('click', function(event) {
    var openButton = $(event.target);
    var modal = modalForOpenButton(openButton);
    var closeButton = closeButtonForModal(modal);
    modal.attr('aria-hidden', false);
    closeButton.focus();
  });

  function closeModal(modal) {
    var openButton = openButtonForModal(modal);
    modal.attr('aria-hidden', true);
    openButton.focus();
  }

  $(closeModalSelector).on('click', function(event) {
    var closeButton = $(event.target);
    var modal = modalForCloseButton(closeButton);
    closeModal(modal);
  });

  $(document).on('keyup', function(event) {
    var ESCAPE_KEY_CODE = 27;

    if(event.keyCode === ESCAPE_KEY_CODE) {
      var modal = $(modalSelector + '[aria-hidden=false]');
      closeModal(modal);
    }
  });

  function openButtonForModal(modal) {
    return $('[data-open-modal=' + modal.data('modal') + ']');
  }

  function closeButtonForModal(modal) {
    return modal.find($(closeModalSelector));
  }

  function modalForOpenButton(openButton) {
    return $('[data-modal=' + openButton.data('open-modal') + ']');
  }

  function modalForCloseButton(closeButton) {
    return closeButton.closest($(modalSelector));
  }
});
