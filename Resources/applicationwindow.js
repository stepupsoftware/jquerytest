sus = {};

sus.ui = function() {
		
	//create the main application window
	createHTMLWindow = function(_args) {
		
	//
	// create base UI tab and root window
	//
	var win = Titanium.UI.createWindow({  
    	title: _args.title,
    	backgroundColor: _args.bgcolor
	});

	var view = Titanium.UI.createWebView({
    	  url: _args.url
    });
    
    Ti.Gesture.addEventListener('orientationchange',function(e) {
		view.left=0;
		view.right=0;
	});	

	win.add(view);	
	
	return win;
	};
	
	return {
		createHTMLWindow: createHTMLWindow
	};
}();