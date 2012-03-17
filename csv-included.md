# Rendering setcions with an other format

Rendeer supports rendering other formats insided the markdown text.
An additional format can be included in a section which starts with -- at the start of a line ends with -- at the start of a line.
Such a section is passed to a javascript function registered at Rendeer to provided the resulting HTML.

Below is a section with semicolon separated values to demonstrate HTML table rendering from CSV data.

--  CSV  
Item No; Description      ; Count; Price
1      ; T-Shirt          ;     2;  21.99
2      ; Jacket insulated ;     1; 119.99
3      ; Jacket shell     ;     1;  89.00
4      ; Belt             ;     3;  12.25
--

This section below is regular _markdown_ text again.
