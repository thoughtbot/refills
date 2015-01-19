Filter = (->
  Filter = (element) ->
    @_element = $(element)
    @_optionsContainer = @_element.find(@constructor.optionsContainerSelector)
    return
  Filter.selector = ".filter"
  Filter.optionsContainerSelector = "> div"
  Filter.hideOptionsClass = "hide-options"
  Filter.enhance = ->
    klass = this
    $(klass.selector).each ->
      new klass(this).enhance()


  Filter::enhance = ->
    @_buildUI()
    @_bindEvents()
    return

  Filter::_buildUI = ->
    @_summaryElement = $("<label></label>").addClass("summary").attr("data-role", "summary").prependTo(@_optionsContainer)
    @_clearSelectionButton = $("<button></button>").text("Clear").attr("type", "button").insertAfter(@_summaryElement)
    @_optionsContainer.addClass @constructor.hideOptionsClass
    @_updateSummary()
    return

  Filter::_bindEvents = ->
    self = this
    @_summaryElement.click ->
      self._toggleOptions()
      return

    @_clearSelectionButton.click ->
      self._clearSelection()
      return

    @_checkboxes().change ->
      self._updateSummary()
      return

    $("body").click (e) ->
      inFilter = $(e.target).closest(self.constructor.selector).length > 0
      self._allOptionsContainers().addClass self.constructor.hideOptionsClass  unless inFilter
      return

    return

  Filter::_toggleOptions = ->
    @_allOptionsContainers().not(@_optionsContainer).addClass @constructor.hideOptionsClass
    @_optionsContainer.toggleClass @constructor.hideOptionsClass
    return

  Filter::_updateSummary = ->
    summary = "All"
    checked = @_checkboxes().filter(":checked")
    summary = @_labelsFor(checked).join(", ")  if checked.length > 0
    @_summaryElement.text summary
    return

  Filter::_clearSelection = ->
    @_checkboxes().each ->
      $(this).prop "checked", false
      return

    @_updateSummary()
    return

  Filter::_checkboxes = ->
    @_element.find ":checkbox"

  Filter::_labelsFor = (inputs) ->
    inputs.map(->
      id = $(this).attr("id")
      $("label[for='" + id + "']").text()
    ).get()

  Filter::_allOptionsContainers = ->
    $ @constructor.selector + " " + @constructor.optionsContainerSelector

  Filter
)()
$ ->
  Filter.enhance()
  return

