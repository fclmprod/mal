/*  MALWARE - Main JS script
 *  v0.9 | 20151121 FINAL VERSION
 *
 *  1. Parsing/Slicing content
 *
*/

$(document).ready(function(){


});

$(window).load(function(){

  $("form[name=contenu]").submit(function(){
    getSource(sourceUrl("source"));
    return false;
  })

  $("input[name=bitmap]").click(function(){
    if($(this).is(":checked")){
      for(i=0;i<$("img").length;i++){
      	$("img").eq(i).replaceWith(convertImageToCanvas($("img").eq(i)));
      }
    }
    else {getSource(sourceUrl("source"));}
  })

  $("input[name=folios]").click(function(){
    if($(this).is(":checked")){
      paginate(".page");
    }
    else {
      $(".folio").remove();
    }
  })

  $("input[name=livret]").click(function(){
    if($(this).is(":checked")){
      impose();
    }
    else {getSource(sourceUrl("source"));}
  })


  $("textarea[name=cssStyle]").change(function(){
    updateStyle($(this).val());
  })

});

function impose() {

  var total = $(".page").length;
  for(i=0;i<4-total%4;i++){
    $("#output").append("<div class=\"page\"></div>");
  }
  total = $(".page").length;

  if(Number.isInteger(total/4)){
    for(i=0;i<total/2;i++){
      $("#output").append("<div class=\"planche\">");
      $(".planche").eq(i).append($(".page").eq(i));
      $(".planche").eq(i).append($(".page").eq((total-i)));
      console.log("planche :"+i);
    }
  }
  else {
    alert("Y'a pas bon");
  }
  $(".page").hide();
  $(".planche .page").show();
  console.log("Total :"+total);
}

function paginate(e){
  $.each($(e),function(i){
    if(i>0){
      $(e).eq(i).append("<div class=\"folio\">"+i+"</div>");
    }
  })
}

function updateStyle(cssInput) {
  $("style").eq($("style").length-1).html(" ");
  var styleElement = document.createElement("style");
  styleElement.textContent = cssInput;
  document.body.appendChild(styleElement);
}

// -- Check URL and clean it.
function sourceUrl(name) {
  var value = $("input[name="+name+"]").val();
  if(isUrl(value)){
    var source = value.replace("https://","http://");

    return source;
  }
  else {
    // isUrl n'accepte pas les addresses locales.
    //alert("C'est pas des URLS !");
    return value;
  }
}

// -- Load source document PHP
// why not use full jquery ?
function getSource(source) {
  $.get('./php/grabber.php?url='+source,function(data){
    processSource(data);
    changeImgSrc(sourceUrl("source"));
    //imageDithering();
    return false;
  });
}


function processSource(data){
  // /!\ Not cool ! Implementation
  $("#output").html("");
  var maxWords = $("input[name=mots]").val();
  //var html = $.parseHTML(addBreaks(data,maxWords)),
  var html = $.parseHTML(data),
  elements = htmlArray(html,"elements"),
  tags = htmlArray(html,"tags");

  console.log(elements);
  splitSource(elements,tags,"HR");
}

function addBreaks(plainHtml,maxWords) {

  var count = 0,
  newPage = "";
  for (var i = 0; i < plainHtml.length; i++) {
    newPage+=plainHtml[i];
    if (plainHtml[i] == " " && plainHtml[i-1] != ">") {
    // Check if page is a space and the page before really is a page
      var patt = new RegExp(/\S/);
      var matchCaracter = patt.test(plainHtml[i-1]);
    //  console.log(page[i-1]);
      if (matchCaracter) {
//        console.log("match!");
        count++;
        if (count >= maxWords) {
          console.log("new page! : ");
          newPage += "<HR>";
          count = 0;
        }
      }
    }
    /*
    if (plainHtml[i+1] == "<") {
      if ((plainHtml[i+2] == "h" || plainHtml[i+2] == "H") && (plainHtml[i+4] == ">")){
        newPage += "<HR>";
        count = 0;
      }
    }
    */
  }
  return newPage;
}

function splitSource(elements,tags,separator){
  $(".page").hide();
  $("#output").append("<div class=\"page\"></div>");
  $.each(elements,function(i){
    if(tags[i]!=separator) {
      $(".page").eq($(".page").length-1).append(elements[i]);
    }
    else {
      $("#output").append("<div class=\"page\"></div>");
      //$(".page").eq($(".page").length-1).append(elements[i]);
    }
  });
}


function changeImgSrc(source){
  source = source.split("/");
  source.pop();
  source = source.join("/");

  $("img").each(function(i){
      var newSrc = source+"/"+$("img").eq(i).attr("src");
      $("img").eq(i).attr("src",newSrc);
  });
}

// returns palette color
function palette(color) {
  var c = parseInt(((color.r + color.g + color.b) / 3) > 128 ? 255 : 0);
  return { r: c, g: c, b: c, a: 255 };
}

// get difference
function calculateQuantError(o, n) {
  var oc = parseInt((o.r + o.g + o.b) / 3),
      nc = parseInt((n.r + n.g + n.b) / 3);
  return { r: oc - nc, g: oc - nc, b: oc - nc, a: 255 };
}

function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
	/*canvas.width = image.width*2;
	canvas.height = image.height*2;
	context.drawImage(image, 0, 0, canvas.width, canvas.height );*/

  var newImage = new Image();
        newImage.onload = function () {
            canvas.width = newImage.width*1;
            canvas.height = newImage.height*1;
            context.drawImage(newImage, 0, 0, canvas.width, canvas.height);
            //localStorage.setItem( "savedImageData", canvas.toDataURL("image/jpg") );
						var imageData = context.getImageData(0,0,canvas.width, canvas.height),
          	data = imageData.data,
      			len = data.length,
      			i = 0;

            // loop through all pixels and apply dither
            for( ; i < len; i+=4) {

            // get RGBA for the current pixel
            var oldColor = {
              r: data[i+0],
              g: data[i+1],
              b: data[i+2],
              a: data[i+3]
            };

            // convert RGBA to palette color
            var newColor = palette(oldColor);

            // apply the new color
            data[i+0] = newColor.r;
            data[i+1] = newColor.g;
            data[i+2] = newColor.b;
            data[i+3] = newColor.a;

            // calculate color difference
            var qe = calculateQuantError(oldColor, newColor);

            // apply differences to surrounding pixels.
            // the try..catch statements just ignores
            // edge cases. it's a codepen, not a lib :)
            try {
              data[i+0+4] += 7/16 * qe.r;
              data[i+1+4] += 7/16 * qe.g;
              data[i+2+4] += 7/16 * qe.b;
              data[i+3+4] += 7/16 * qe.a;
            } catch(e) {}
            try {
              data[i+0-4+w*4] += 3/16 * qe.r;
              data[i+1-4+w*4] += 3/16 * qe.g;
              data[i+2-4+w*4] += 3/16 * qe.b;
              data[i+3-4+w*4] += 3/16 * qe.a;
            } catch(e) {}
            try {
              data[i+0+w*4] += 5/16 * qe.r;
              data[i+1+w*4] += 5/16 * qe.g;
              data[i+2+w*4] += 5/16 * qe.b;
              data[i+3+w*4] += 5/16 * qe.a;
            } catch(e) {}
            try {
              data[i+0+4+w*4] += 1/16 * qe.r;
              data[i+1+4+w*4] += 1/16 * qe.g;
              data[i+2+4+w*4] += 1/16 * qe.b;
              data[i+3+4+w*4] += 1/16 * qe.a;
            } catch(e) {}
          }

          context.putImageData(imageData, 0, 0);

          }
        newImage.crossOrigin = "Anonymous";
        newImage.src = image.src;

        canvas.width=canvas.width;
        canvas.width=canvas.width;
	return canvas;
}

/*  UTILS FUNCTIONS
 *  ---------------
 *
 */

function isUrl(url) {
  return /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url);
}

function htmlArray(html,option) {
  var elements = [],
  tags = [];
  $.each(html,function(i,el){
    if (el.nodeName != "#text" && el.nodeName != "#comment" && el.nodeName != "STYLE" && el.nodeName != "META" && el.nodeName != "SCRIPT" && el.nodeName != "PRE" && el.nodeName != "LINK" && el.nodeName != "TITLE" && el.className != "notes" && el.className != "pagenum" ){
      tag_in = "<"+el.nodeName+">",
      tag_out = "<"+el.nodeName+"/>",
      tags[i] = el.nodeName,
      elements[i] = tag_in+el.innerHTML+tag_out;
    }
  });

  if(option=="elements") {
    return elements;
  }
  else {
    return tags;
  }
}
