/*  MALWARE - Main JS script
 *  v0.9 | 20151121 FINAL VERSION
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
  $("style").eq($("style").length-1).remove();
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
   // $("input[name="+name+"]").val()"C'est pas des URLS !");
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

  //console.log(elements);
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
        console.log($("img").eq(i).attr("src"));
        $("img").eq(i).attr("src",newSrc);
        console.log(newSrc);
    });

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
