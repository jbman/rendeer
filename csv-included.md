# Rendering sections with an additional format

Rendeer supports rendering other formats insided the markdown text.
An additional format can be included in a section marked with double minus '--' at the start of a line.
Such a section is passed to a javascript function registered at Rendeer which renders the content to HTML.

## Example

-- MyFormat

Rendered by plugin function registered for 'MyFormat'.

--

## Demo
Below is a section with semicolon separated values to demonstrate HTML table rendering from CSV data.

--  CSV  
Item No; Description      ; Count; Price
1      ; T-Shirt          ;     2;  21.99
2      ; Jacket insulated ;     1; 119.99
3      ; Jacket shell     ;     1;  89.00
4      ; Belt             ;     3;  12.25
--

This section below is regular _markdown_ text again.
