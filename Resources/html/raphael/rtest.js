window.onload = function() {
// see http://net.tutsplus.com/tutorials/javascript-ajax/an-introduction-to-the-raphael-js-library/ for inspiration
// dimemsions
    var size = 750;
    var rect_height = (size/3);
    var rect_width = (rect_height*1.25);
    var curve = (size/20);
    var arrow = (size/40);
    var gap = size/30;
//  fontsizes
    var fontsize = (size/30);
    var titlesize = (size/45);
    var smallfontsize = (size/60);
//  positions
    var p1 = (size/15);
    var p2 = (p1+gap+(rect_width));
    var p3 = (p1+gap+(rect_height));
    var p4 = p1+((rect_width)/2);
    var p5 = p1+((rect_height)/2);
    var p6 = p1 + (rect_width) + gap + ((rect_width)/2);
    var p7 = p1+curve;
    var p8 = p1+rect_height;
    var p9 = p1+rect_height-curve;
    var p10 = p2+rect_height;
    var p11 = p2+(curve/2)+gap;
    var p12 = p3+rect_height-curve;
    var p13 = p3+gap;
    var p14 = p1 + (rect_height) + gap + ((rect_height)/2);

    var paper = new Raphael(document.getElementById('canvas_container'), size*2, size);
    // rectangles
    var focused = paper.rect(p1,p1,(rect_width),rect_height,curve).attr({"stroke":"brown"}); // .attr({fill: "#F9B7FF"}); 
    var organised = paper.rect(p2,p1,(rect_width),rect_height, curve).attr({"stroke":"brown"}); 
    var inspired = paper.rect(p1,p3,(rect_width),rect_height,curve).attr({"stroke":"brown"}); 
    var connected = paper.rect(p2, p3,(rect_width),rect_height,curve).attr({"stroke":"brown"});
    
    // path definitions
    var topleftpath = calcpathstring({
		x1: p1+(curve/2), // arrow start x
		y1: p1+(curve/2), // arrow start y
		x2: (rect_width)-curve, // arrow end x
		y2: rect_height-curve, // arrow end y
		x3: 0, // arrow tip start x
		y3: arrow,  // arrow tip start y
		x4: arrow, // arrow tip start x
		y4: 0,  // arrow tip start y
		x5: 0, // arrow tip start x
		y5: -arrow, // arrow tip start x
		x6: -arrow,  // arrow tip start y
		y6: 0,  // arrow tip start y
	}); 
    var bottomleftpath = calcpathstring({
                x1: p1+(curve/2), // arrow start x
                y1: p1+rect_height+gap+rect_height-(curve/2), // arrow start y
                x2: (rect_width)-curve, // arrow end x
                y2: (rect_height* -1)+curve, // arrow end y
                x3: arrow, // arrow tip start x
                y3: 0,  // arrow tip start y
                x4: 0, // arrow tip start x
                y4: -arrow,  // arrow tip start y
                x5: 0, // arrow tip start x
                y5: arrow,  // arrow tip start y
                x6: -arrow, // arrow tip start x
                y6: 0,  // arrow tip start y
        });
    var toprightpath = calcpathstring({
                x1: p2+(curve/2), // arrow start x
                y1: p1+rect_height-(curve/2), // arrow start y
                x2: (rect_width)-curve, // arrow end x
                y2: (rect_height* -1)+curve, // arrow end y
                x3: arrow, // arrow tip start x
                y3: 0,  // arrow tip start y
                x4: 0, // arrow tip start x
                y4: -arrow,  // arrow tip start y
                x5: 0, // arrow tip start x
                y5: arrow,  // arrow tip start y
                x6: -arrow, // arrow tip start x
                y6: 0,  // arrow tip start y
        });
    var bottomrightpath = calcpathstring({
                x1: p2+(curve/2), // arrow start x
                y1: p1+rect_height+gap+(curve/2), // arrow start y
                x2: (rect_width)-curve, // arrow end x
                y2: rect_height-(curve), // arrow end y
                x3: 0, // arrow tip start x
                y3: arrow,  // arrow tip start y
                x4: arrow, // arrow tip start x
                y4: 0,  // arrow tip start y
                x5: 0, // arrow tip start x
                y5: -arrow,  // arrow tip start y
                x6: -arrow, // arrow tip start x
                y6: 0,  // arrow tip start y
        });
    //paths
    var topleft = paper.path(topleftpath).attr({"stroke":"black"});
    var bottomleft = paper.path(bottomleftpath);
    var topright = paper.path(toprightpath);
    var bottomright = paper.path(bottomrightpath);
    //terms
    var obsessed_text = paper.text(p7,p7,'Obsessed').attr({"smallfontsize":fontsize,"stroke":"black"});
    var directionless_text = paper.text(p8,p9,'Directionless').attr({"smallfontsize":fontsize,"stroke":"red"});
    var micromanager_text = paper.text(p10,p7,'Micromanager').attr({"smallfontsize":fontsize,"stroke":"black"});
    var muddled_text = paper.text(p11,p9,'Muddled').attr({"smallfontsize":fontsize,"stroke":"red"});
    var ott_text = paper.text(p7,p12,'Over the Top').attr({"smallfontsize":fontsize,"stroke":"black"});
    var dull_text = paper.text(p8,p13,'Dull').attr({"smallfontsize":fontsize,"stroke":"red"});
    var soft_text = paper.text(p10,p12,'Soft').attr({"smallfontsize":fontsize,"stroke":"black"});
    var distant_text = paper.text(p11,p13,'Distant').attr({"smallfontsize":fontsize,"stroke":"red"});
    //square titles
    var focused_text = paper.text(p4,p5,'Focused\nLeader').attr({"font-size":fontsize,"stroke":"brown"}).animate({transform: "r45"},2000);
    var inspired_text = paper.text(p4,p14,'Inspirational\nLeader').attr({"font-size":fontsize,"stroke":"brown"});
    var organised_text = paper.text(p6, p5,'Organised\nManager').attr({"font-size":fontsize,"stroke":"brown"});
    var connected_text = paper.text(p6,p14,'Connected\nManager').attr({"font-size":fontsize,"stroke":"brown"});
//
    var engaginginaction_text = paper.text(p2,gap/2,'ENGAGING IN ACTION').attr({"font-size":titlesize,"stroke":"black"});
    var engagingwithpeople_text = paper.text(p2,p3+rect_height+gap,'ENGAGING WITH PEOPLE').attr({"font-size":titlesize,"stroke":"black"});
    var transformationalleadership_text = paper.text(gap,rect_height+gap,'TRANSFORMATIONAL LEADERSHIP').attr({"font-size":titlesize,"stroke":"black"});
    transformationalleadership_text.rotate(270);
    var transactionalmanagership_text = paper.text((p1)+(gap*2)+(rect_height*2.5),rect_height + gap,'TRANSACTIONAL MANAGERSHIP').attr({"font-size":titlesize,"stroke":"black"});
    transactionalmanagership_text.rotate(90);
    var engagingwithpeople_text = paper.text(p2,p3+rect_height + gap,'ENGAGING WITH PEOPLE').attr({"font-size":titlesize,"stroke":"black"});
}

var calcpathstring = function(args) {
	var start = "M " +args.x1 +" " +args.y1;
	var line = " l " +args.x2 + " " +args.y2;
	var arrowstart = " M " +args.x1 + " " +args.y1;
	var arrowleft = " l " +args.x3 + " " +args.y3;
	var arrowright = " l " +args.x4 + " " +args.y4;
	var bottom = " M " +(args.x1 + args.x2) + " " + (args.y1 + args.y2);
	var arrowbottomleft = " l " +args.x5 + " " +(args.y5);
	var arrowbottomright = " l " +(args.x6) + " " +(args.y6);

	var path = start+line+arrowstart+arrowleft+start+arrowright+bottom+arrowbottomleft+bottom+arrowbottomright;

	return path;	
}
