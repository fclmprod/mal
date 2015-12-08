url = "../examples/gut.htm";
//url = "http://www.gutenberg.org/files/10/10-h/10-h.htm";

function getContents(url) {
	$.get('php/grabber.php?url='+url,function(data){
		gutenbergSpecific(data);
	});
}

getContents(url);


function gutenbergSpecific(data){
	var html = $.parseHTML(data),
	log = $("#log"),
	nodeNames = [],
	nodes = [];

	$.each(html,function(i,el){
		if (el.nodeName != "#text" && el.nodeName != "#comment" && el.nodeName != "STYLE" && el.nodeName != "META" && el.nodeName != "SCRIPT" && el.nodeName != "PRE" && el.className != "notes" && el.className != "pagenum" ){
			// create tag_in and tag_out for style
			tag_in = "<"+el.nodeName+">",
			tag_out = "<"+el.nodeName+"/>",
			// print innerHTML with tags
			nodeNames[i] = el.nodeName;
			nodes[i] = tag_in+el.innerHTML+tag_out;
		}
	});

	$("<div id=\"content\"></div>").appendTo($("body"));
	$("#content").append("<div class=\"page\"></div>");
	$.each(nodes,function(i){

		if(nodeNames[i]!="HR") {
			$(".page").eq($(".page").length-1).append(nodes[i]);
		}
		else {
			$("#content").append("<div class=\"page\"></div>");
		}
	});

	$(".pagenum").css({"display":"none"}) // .pagenum cannot be erased whit nodeName because it's almost alaways inside another element.
}
