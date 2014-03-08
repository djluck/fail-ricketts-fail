View = {};

View.views = ["viewFails", "addFail", "viewSingleFail"];

View.setCurrent = function(viewName){
	Session.set("currentView", viewName);
}

View.getCurrent = function(){
	Session.set("currentView", View.views[0]);
	return Session.get("currentView");
}