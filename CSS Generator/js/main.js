/* CSS GENERATOR - Main JS script
   v0.1 | 20151121

   /!\ Don't forget we display an half reducted version of sample page
*/

$(document).ready(function(){

  /* Populating Styling Form */

  var couleurs = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","transparent","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"];
  optionsGenerator(couleurs,"body_background-color");
  optionsGenerator(couleurs,"body_color");

  var fonts = ["Anonymous Pro","Helvetica","Garamond"];
  optionsGenerator(fonts,"h1-h2_font-family");
  optionsGenerator(fonts,"p_font-family");

  var fontSizes = ["8pt","10pt","12pt","14pt","18pt","24pt","28pt"];
  optionsGenerator(fontSizes,"h1_font-size");
  optionsGenerator(fontSizes,"h2_font-size");
  optionsGenerator(fontSizes,"p_font-size");
  optionsGenerator(fontSizes,"p_line-height");

  var indentSizes = ["0mm","5mm","10mm","15mm","20mm"];
  optionsGenerator(indentSizes,"p_text-indent");

  var formats = ["A4","A3"];
  var orientations = ["portrait","paysage"];
  optionsGenerator(formats,"format");
  optionsGenerator(orientations,"orientation");


});

$(window).load(function(){

  getValues("select,input",".page");

});

/* ///// FUNCTIONS ///// */

/* ___ Options ___ */

// 1. Populate ___________________________
function optionsGenerator(array,name){
  // Populate selects with array values.
  for(i=0;i<array.length;i++){
    var contenu = "<option style=\"background-color:"+array[i]+";font-family:"+array[i]+";\" value=\""+array[i]+"\">"+array[i]+"</option>";
    $("select[name="+name+"]").append(contenu);
  }
  //On change : apply -> store values. Here ?
}

// 2. Hash selected values (and apply css ?)
// This functions get value and apply it to the .page elements.
function getValues(element,sample){
  // Hash ?
  $(element).change(function(){
    var string = $(this).attr("name").split("_");
    var selector = string[0].split("-").join(","); // In case of multiple selectors
    var rule ={};
    rule[string[1]] = $(this).val();

    // If the options is to be applied to the body element, we delet the body selector to apply it only to the sample name (.page)
    if(selector=="body"){
      selector= "";
    }

    $(sample+" "+selector).css(rule);
  });
}
