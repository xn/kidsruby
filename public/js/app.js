function updateStdOut(newHtml) {
	$("#stdout").append(newHtml);
};

function updateStdErr(newHtml) {
	$("#stderr").append(newHtml);
}

function clearOutputs() {
	$.each(["stdout", "stderr"], function(i, item) {
		$("#" + item).html("");
	});
}

function submitRubyCode(editor) {
	var ruby = editor.getCode();
	QTApi['evaluateRuby(QString)'](ruby);
}

function openRubyCode() {
	QTApi['openRubyFile(QString)']("");
}

function saveRubyCode(editor) {
	var ruby = editor.getCode();
	QTApi['saveRubyFile(QString)'](ruby);
}

function getEditor() {
  return $("#rubycode").data("editor");
}

function clearCode() {
  getEditor().setCode("");
}

function addCode(code) {
  getEditor().setCode(getEditor().getCode() + "\n" + code);
}

function initTurtle() {
  var turtle = new Pen("turtle-canvas");
  turtle.center();
	$("#turtle").data('turtle', turtle);
}

function callTurtle(arguments) {
  var turtle = $("#turtle").data('turtle');
  var command = Array.prototype.shift.call(arguments);
  return turtle[command].apply(turtle, arguments);
}

function getTurtle() {
  return $("#turtle").data('turtle');
}

function setTurtleBackground(color) {
  $("#turtle").css('backgroundColor', color);
}

$(document).ready(function() {
	var docWidth = $("body").width();
  var docHeight = $(document).height();
	
	var editor = CodeMirror.fromTextArea('rubycode', {
	      parserfile: ["../../js/tokenizeruby.js", "../../js/parseruby.js"],
	      stylesheet: "css/rubycolors.css",
	      path: "codemirror/js/",
	      lineNumbers: true,
	      textWrapping: false,
	      indentUnit: 2,
				tabMode: "indent",
				content: $('#rubycode').val(),
	      parserConfig: {},
	      width: docWidth,
	      height: '95%',
				iframeClass: 'editor-window',
	    	autoMatchParens: true
	  });

	$("#rubycode").data("editor", editor);

	// Set the output width
	$("#output").width = docWidth;
  
	$("#run").click(function(e) {
		clearOutputs();
		submitRubyCode(editor);
	});

	$("#open").click(function(e) {
		openRubyCode(editor);
	});

	$("#save").click(function(e) {
		saveRubyCode(editor);
	});
	
	initTurtle();

  $("#tabs").tabs();
  //$("#help iframe").css("height", docHeight-200);
  console.info(docHeight);
});
