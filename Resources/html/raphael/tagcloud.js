var paper;
var titlesize;
var counter;
var countertext;
var error;
window.onload = function() {
// see http://net.tutsplus.com/tutorials/javascript-ajax/an-introduction-to-the-raphael-js-library/ for inspiration
	var size = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	size = size * 0.9;
    var lhs = (size/15);
    var cheese = (size/3);
    var bevel = (size/10);
    var gap = size/30;
    var rhs = (lhs+gap+(cheese));
    var bhs = (lhs+gap+(cheese));
    var errorloc = ((size/5)*3);
    titlesize = (size/45);
    paper = new Raphael(document.getElementById('canvas_container'), size, size);
    counter = 0;	
	error = paper.text((size/2),bhs+gap,"Select eight words.  Click a word to select it.").attr({"font-size":(size/30),"stroke":"blue",'text-anchor': 'middle'});

	var mywordsjson = {"words": [
			{"title":"overenthusiastic","value":"1","Group":"Focus", "x":"100", "y":"100"},
			{"title":"devoted","value":"2","Group":"Focus", "x":"100", "y":"120"},
			{"title":"dogmatic","value":"1","Group":"Focus", "x":"100", "y":"140"},
			{"title":"impassioned","value":"3","Group":"Focus", "x":"100", "y":"160"},
			{"title":"single minded","value":"1","Group":"Focus", "x":"100", "y":"180"},
			{"title":"zealous","value":"2","Group":"Focus", "x":"100", "y":"200"},
			{"title":"dedicated","value":"3","Group":"Focus", "x":"100", "y":"220"},
			{"title":"obsessive","value":"1","Group":"Focus", "x":"100", "y":"240"},
			{"title":"deliberate","value":"1","Group":"Focus", "x":"100", "y":"100"},
			{"title":"determined","value":"2","Group":"Focus", "x":"100", "y":"120"},
			{"title":"positive","value":"1","Group":"Focus", "x":"100", "y":"140"},
			{"title":"tenacious","value":"3","Group":"Focus", "x":"100", "y":"160"},
			{"title":"staunch","value":"1","Group":"Focus", "x":"100", "y":"180"},
			{"title":"unwavering","value":"2","Group":"Focus", "x":"100", "y":"200"},
			{"title":"persistent","value":"3","Group":"Focus", "x":"100", "y":"220"},
			{"title":"unfaltering","value":"1","Group":"Focus", "x":"100", "y":"240"},
			{"title":"unplanned","value":"1","Group":"Focus", "x":"100", "y":"100"},
			{"title":"casual","value":"2","Group":"Focus", "x":"100", "y":"120"},
			{"title":"haphazard","value":"1","Group":"Focus", "x":"100", "y":"140"},
			{"title":"indescriminate","value":"3","Group":"Focus", "x":"100", "y":"160"},
			{"title":"goalless","value":"1","Group":"Focus", "x":"100", "y":"180"},
			{"title":"contrary","value":"2","Group":"Focus", "x":"100", "y":"200"},
			{"title":"meandering","value":"3","Group":"Focus", "x":"100", "y":"220"},
			{"title":"fickle","value":"1","Group":"Focus", "x":"100", "y":"240"}
		]};
		
    var mywords = _.shuffle(mywordsjson.words); // uses underscore shuffle (I love underscore.js!!)
    var x = (size/4);
    var y = (size/40);
    var width = (size/4);
    var depth = (size/20);
    var i = 1;
    var inc = 1;
    for (var i in mywords) {
 		    var easing = getrandomeasing();
		    var angle = getrandomangle();
    		var word1 = animatedtext({
				x: 0, 
				y: lhs,
				text: mywords[i].title,
				angle: 'r360',
				timer: 5000,
				font: (size/12),
				newx: x,
				newy: y,
				easing: easing
    		});
    	x = x + width;
    	if (inc == 3) {
    		inc = 1;
    		x = (size/4);
	    	y = y + depth;
    	} else {
    		inc++;
    	}
    }
};

var getrandomangle = function() {
	var angles = new Array("r0","r90","r0","r270","r0","r360","r360","r270","r360","r360");  // not strictly random as more chance of zero or 360 degrees rotation
	angles = _.shuffle(angles);
	var angle = _.first(angles);  //uses underscore first to return first value
	
	return angle;	
	
}

var getrandomeasing = function() {
	var easings = new Array("linear", "ease-in","ease-out","back-in","back-out","elastic","bounce");
	easings = _.shuffle(easings);
	var easing = _.first(easings);	
	
	return easing;
}

var	animatedtext = function(args) {

	var text = paper.text(args.x,args.y,args.text)
				.attr({"font-size":args.font,"stroke":"grey", 'text-anchor': 'middle'})
				.animate({transform: "s0.25", x: args.newx ,y: args.newy},args.timer, args.easing);
	text.selected=0;
		
	text.node.onclick = function() {
		if (text.selected === 0) {
			text.selected = 1;
			text.animate({transform: "s0.35", stroke: "black"}); // s1.5 means size * 1.5
			//text.attr({"font-size": 25}); //can be set as an actual size rather than animated
			counter++;
		} else {
			text.selected = 0;
			text.animate({transform: "s0.25", stroke: "grey"});
			counter--;
		}
		if (counter === 0) {
			var errortext = "Select eight words.  Click a word to select it.";
			error.attr({"opacity":1, "text":errortext, "stroke":"blue"});
		} else if (counter >8) {
			var errortext = "You have selected " +counter + " words.\nYou must only select eight words.\nPlease de-select " +(counter-8) +" words to continue.";
			error.attr({"opacity":1, "text":errortext, "stroke":"red"});
		} else if (counter === 8) {
			var errortext = "Press OK to continue or de-select a word to modify your selection.";
			error.attr({"opacity":1, "text":errortext, "stroke":"green"});
		} else {
			var errortext = "You have selected " +counter + " words. Select " +(8-counter) + " more";
			error.attr({"opacity":1, "text":errortext, "stroke":"blue"});
		}
	};
	return text;
};
