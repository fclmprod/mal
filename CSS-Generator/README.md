*20151121 - Martin*
# README - Stylesheet Generator
*For **MAL**ware editorial project*

Create an interface to allow user to choose parameters to be applied to the generated book/pdf.

## Formular
### Formular construction

Javascript is used to populate multiple choices elements such as **selects** and **radios**. For now only **selects** elements can be populated through a function taking an array of values and a select element id as parameters.

### Specific syntax for Options

The name of the form element is used to specify its targeted action. Because it's built to generate a CSS based stylesheet, two specific informations need to be specified : **selector** & **property**. As some property names are composed of two words linked by an hyphen, an *underscore (_)* will be used to separate the two value. The following example shows how to name an input to specify the **color** of a **span** element :

    // Single selector
    <input type="text" name="p_text-indent"/>
    // Multiple selector
    <input type="text" name="h1-h2_font-family"/>

Then the name or the id needs to be hashed be understood as a css rule. By a simple split with underscore as parameter, we can get selector and property respectively as first (0) and second (1) entry of the array.

*Maybe we don't even need to pass them as id*.
## Previewing

### Applying Formular
The changed form element name is hashed then put in a css via the **rule** variable.

## Output Management
Output a CSS code with at least returns, and tabs in a textarea element at first. Then find a way to handle it. If we keep this page as basic structure they will be no need for transmitting the css data. Actually, the CSS doesn't need to be outputted anywhere because the pages can be printed directly from this page.  

## Printing
### Page
Apparently at least in Chrome, the CSS properties we use (page-break, etc ...), need a float hack to work. Also, the **columns** css property ISN'T APPLIED WHEN PRINTING ! So we need multiple paragraphs to simulate it.

** To do **
* Create a simple UI (Fuck jQuery UI, fuck jQuery also in a wider perspective)
* Find a way to transmit generated parameters
* Choose only open source fonts :
  * Anonymous pro
  * Are old fonts public domain ?
* Main and print stylesheets
* ~~**Make** and add ***SpecificPalette.js***~~ (After ?)
* Options to add :
  * Columns
  * Margins ?
  * Text align
  * Line height
  * Letter spacing
* Pagination ?
* Save choices as cookies to avoid losses
* VERIFY PRINTING (Minus padding etc ...)
* How to splice the parsed content ?

/!\ This (as always) needs to be implemented in any other project
Maybe not.

**(?) IDEAS :** random sample document to preview the generated style / Add column system; / Random style button, for when you just don't want to /
___
*
At first I thought this was supposed to be limited to the UI part of the full app. But its simplicity and its versatility lead me to think that it could be the final structure of the project. Even with its inDesign-like looks, it can come in handy. If we manage to append the parsed content into, the preview and debugging can be fastened.*
**This imply to CONSTANTLY check the printed version of the webpage.
**

Also, it will need a slicing method to put the content into pages before coming into this page ...

*20151122 Martin*

Trying to add Alex's parsing into the page. Trying no to break anything !
