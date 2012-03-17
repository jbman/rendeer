// Rendeer content rendering engine
//
// Uses Showdown to render HTML from markdown.
// 
// How to use:
// # Write a HTML page template with links to markdown files and class "rendeer" for the anchor:
//    <a class="rendeer" href="my-content.md">my-content.md will be rendered here if javascript is on.</a>
// # Run rendeer when DOM is ready by using jQuery in your HTML page template:
//     <script>$(document).ready(rendeer.run);</script>

var rendeer = (function($) {
  var that = {};
  var formatRenderers ={};

  // Main function for running Rendeer
  that.run = function() {
    console.debug("Rendeer starts running");
    
    converter = new Showdown.converter();
    
    // Finds sections to be converted by a registered FormatRenderer and converts them
    // Returns the input string with some sections alreday converted to HTML.
    var fConvertOtherFormats = function(text) {
      var regexp, fConvertOther;
      // TODO: Build up regexp CSV|...|... when renderers are registered
      // (?: means: do not create a backreference for this bracket group (The outer bracket group should be replaced)
      regexp = /--\s*([CSV]\s*(?:.|[\n\r])*)--/gm;
      fConvertOther = function(text) {
        text =  $.trim(text.substring("--".length, startPos));
        var startPos = text.search(/\s/);
        var format = text.substring(0, startPos);
        text = text.substring(startPos, text.length - "--".length);
        // Get the responsible converter:
        console.debug("Convert format %s: %s", format, text);
        var renderFunction = formatRenderers[format];
        return renderFunction(text);
      };
      text = text.replace(regexp, fConvertOther);
      return text;
    };
            
    // Converts the markdown input string to an HTML string.
    var fConvert = function(markdown) {
      console.debug("Convert markdown to HTML");
      markdown = fConvertOtherFormats(markdown);
      return converter.makeHtml(markdown);
    };

    // Loads the given fileUrl as text and calls the fSuccess function.
    var fLoadAsText = function(fileUrl, fSuccess) {
      console.debug('fLoadAsText(%s)', fileUrl);
      $.ajax({
        url: fileUrl,
        dataType: 'text',
        beforeSend: function(xhr) {
            if (typeof xhr.overrideMimeType != 'undefined') {
                xhr.overrideMimeType("text/plain");
            }
          },
        success: fSuccess
      });
    };

    // Each link with CSS class 'rendeerr' is loaded, converted and included in the current DOM.
    $('.rendeer').each(function(index) {
      var aNode = $(this);
      var hrefVal = aNode.attr("href");
      console.debug("Load and render file %s into element %o", hrefVal, aNode.get());
      fLoadAsText(hrefVal, function(data) {
        console.debug("Loaded content of file", hrefVal);
        var html = fConvert(data);
        console.debug("'Replace element %o", aNode.get());
        aNode.replaceWith(html);
      })
    });
  };

  // Register a renderer for a custom format
  that.registerRenderer = function(formatId, renderFunction) {
    if (typeof formatId != 'string') {
      console.error("Format renderer not registered: formatId must be a string");
      return;
    }
    if (typeof renderFunction != 'function') {
      console.error("Format renderer for not registered: renderFunction must be a function");
      return;
    }
    formatRenderers[formatId] = renderFunction;
  };

  return that;
}(jQuery));



