Filter = (->
  Filter(element) ->
    this._element = $(element)
    this._optionsContainer = this._element.find(this.constructor.optionsContainerSelector)

  Filter.selector = '.filter'
  Filter.optionsContainerSelector = '> div'
  Filter.hideOptionsClass = 'hide-options'

  Filter.enhance = ->
    klass = this

    $(klass.selector).each ->
      new klass(this).enhance()

  Filter.prototype.enhance = ->
    this._buildUI()
    this._bindEvents()

  Filter.prototype._buildUI = ->
    this._summaryElement = $('<label></label>').
      addClass('summary').
      attr('data-role', 'summary').
      prependTo(this._optionsContainer)

    this._clearSelectionButton = $('<button></button>').
      text('Clear').
      attr('type', 'button').
      insertAfter(this._summaryElement)

    this._optionsContainer.addClass(this.constructor.hideOptionsClass)
    this._updateSummary()

  Filter.prototype._bindEvents = ->
    self = this

    this._summaryElement.click ->
      self._toggleOptions()

    this._clearSelectionButton.click ->
      self._clearSelection()

    this._checkboxes().change ->
      self._updateSummary()

    $('body').click (event) ->
      inFilter = $(event.target).closest(self.constructor.selector).length > 0

      unless inFilter
        self._allOptionsContainers().addClass(self.constructor.hideOptionsClass)

  Filter.prototype._toggleOptions = ->
    this._allOptionsContainers()
      .not(this._optionsContainer)
      .addClass(this.constructor.hideOptionsClass)

    this._optionsContainer.toggleClass(this.constructor.hideOptionsClass)

  Filter.prototype._updateSummary = ->
    summary = 'All'
    checked = this._checkboxes().filter(':checked')

    if checked.length > 0
      summary = this._labelsFor(checked).join(', ')

    this._summaryElement.text(summary)

  Filter.prototype._clearSelection = ->
    this._checkboxes().each ->
      $(this).prop('checked', false)

    this._updateSummary()

  Filter.prototype._checkboxes = ->
    this._element.find(':checkbox')

  Filter.prototype._labelsFor = (inputs) ->
    inputs.map(->
      id = $(this).attr('id')
      $("label[for='#{id}']").text()
    ).get()

  Filter.prototype._allOptionsContainers = ->
    $(this.constructor.selector + " " + this.constructor.optionsContainerSelector)

  Filter
)()

$ ->
  Filter.enhance()
