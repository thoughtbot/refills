$(function() {
  var code = $("[data-editor]").each(function() {
    var editor = ace.edit(this);
    var language = $(this).data("language");
    editor.getSession().setMode("ace/mode/"+language);
    editor.setOptions({
      readOnly: true,
      showFoldWidgets: false,
      theme: "ace/theme/tomorrow",
      useWorker: false,
    });
  });
});
