// Register renderer for CSV to HTML table
(function( rendeer ){
  
  if(!String.prototype.trim) {
    console.debug("Adding trim function to String.prototype");
    String.prototype.trim = function() {
      return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
  };
  
  var renderFunction = function(csvText) {
    var lines, firstLine, out;
    
    out = "<table>";
    lines = csvText.split(/[\n\r]+/);
    console.debug("csvText: %o", csvText)
    console.debug("Lines: %o", lines);

    lines.forEach(function(line)
    {
      var fCell;
      
      // Ignore empty lines
      if(!line.match(/\S/)) {
        return;
      }

      var cells = line.split(";");

      // First line specifies headers and number of columns
      if (!firstLine) {
        firstLine = line;
        fCell = function(cellText) {
          return '<th scope="col">' + cellText + '</th>';
        };
      }
      else { 
        fCell = function(cellText) {
          return '<td>' + cellText + '</td>';
        };
      }

      out += "<tr>";
      cells.forEach(function(cell)
      {
        out +=  fCell(cell.trim());
      });
      out += "</tr>";
    });
    out += "</table>";
    console.debug("out: %o", out);
    return out;
  };
  rendeer.registerRenderer("CSV", renderFunction);

})( rendeer );
