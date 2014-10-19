(function() {
  var Filter;

  Filter = (function() {
    Filter(element)(function() {
      this._element = $(element);
      return this._optionsContainer = this._element.find(this.constructor.optionsContainerSelector);
    });
    Filter.selector = '.filter';
    Filter.optionsContainerSelector = '> div';
    Filter.hideOptionsClass = 'hide-options';
    Filter.enhance = function() {
      var klass;
      klass = this;
      return $(klass.selector).each(function() {
        return new klass(this).enhance();
      });
    };
    Filter.prototype.enhance = function() {
      this._buildUI();
      return this._bindEvents();
    };
    Filter.prototype._buildUI = function() {
      this._summaryElement = $('<label></label>').addClass('summary').attr('data-role', 'summary').prependTo(this._optionsContainer);
      this._clearSelectionButton = $('<button></button>').text('Clear').attr('type', 'button').insertAfter(this._summaryElement);
      this._optionsContainer.addClass(this.constructor.hideOptionsClass);
      return this._updateSummary();
    };
    Filter.prototype._bindEvents = function() {
      var self;
      self = this;
      this._summaryElement.click(function() {
        return self._toggleOptions();
      });
      this._clearSelectionButton.click(function() {
        return self._clearSelection();
      });
      this._checkboxes().change(function() {
        return self._updateSummary();
      });
      return $('body').click(function(event) {
        var inFilter;
        inFilter = $(event.target).closest(self.constructor.selector).length > 0;
        if (!inFilter) {
          return self._allOptionsContainers().addClass(self.constructor.hideOptionsClass);
        }
      });
    };
    Filter.prototype._toggleOptions = function() {
      this._allOptionsContainers().not(this._optionsContainer).addClass(this.constructor.hideOptionsClass);
      return this._optionsContainer.toggleClass(this.constructor.hideOptionsClass);
    };
    Filter.prototype._updateSummary = function() {
      var checked, summary;
      summary = 'All';
      checked = this._checkboxes().filter(':checked');
      if (checked.length > 0) {
        summary = this._labelsFor(checked).join(', ');
      }
      return this._summaryElement.text(summary);
    };
    Filter.prototype._clearSelection = function() {
      this._checkboxes().each(function() {
        return $(this).prop('checked', false);
      });
      return this._updateSummary();
    };
    Filter.prototype._checkboxes = function() {
      return this._element.find(':checkbox');
    };
    Filter.prototype._labelsFor = function(inputs) {
      return inputs.map(function() {
        var id;
        id = $(this).attr('id');
        return $("label[for='" + id + "']").text();
      }).get();
    };
    Filter.prototype._allOptionsContainers = function() {
      return $(this.constructor.selector + " " + this.constructor.optionsContainerSelector);
    };
    return Filter;
  })();

  $(function() {
    return Filter.enhance();
  });

}).call(this);
