// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

Ti.include("applicationwindow.js");

var tabGroup = Titanium.UI.createTabGroup();


var win1 = sus.ui.createHTMLWindow({
	title: 'Two by Two',
	url: '/html/raphael/rtest.html',
	bgcolor: 'fff'
});

var win2 = sus.ui.createHTMLWindow({
	title: 'Tag Cloud',
	url: '/html/raphael/tagcloud.html',
	bgcolor: 'fff'
});

var image = win2.toImage();
// JSPDF 
Ti.include('jspdf.js');

var doc = new jsPDF();
doc.text(20, 20, 'Hello world!');
doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
doc.addPage();
doc.text(20, 20, 'Do you like that?');
doc.addPage();
doc.addImage(image,'jpg',20,20);

var res = doc.output();
var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'test.pdf');
file.write(res);

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Two by Two',
    window:win1
});

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tag Cloud',
    window:win2
});

tabGroup.addTab(tab2); 
tabGroup.addTab(tab1); 

tabGroup.open();
