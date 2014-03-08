Template.addFail.events({
	"click #btn-create-fail" : function(){
		try{
			Fails.addFail(
				$("#failName").val(), 
				$("#failUrl").val()
			);
			Session.set("addingFail", false);
		}
		catch(errors){
			Session.set("errorAddingFail", errors);
		}

		return false;
	},
	"click #btn-cancel-fail" : function(){
		Session.set("addingFail", false);
	}
});

Template.addFail.created = function(){
	Session.setDefault("addingFail", false);

	//clear out any previous validation errors when the popup is closed
	Deps.autorun(function(){
		if (!Template.addFail.visible())
			Session.set("errorAddingFail", null);
	});
};

Template.addFail.visible = function(){
	return Session.get("addingFail");
};

Template.addFail.couldNotAddFail = function(){
	Session.setDefault("errorAddingFail", null);
	var errors = Session.get("errorAddingFail");
	return errors !== null;
};

Template.addFail.errorMessages = function(){
	var errors = Session.get("errorAddingFail");
	return _.map(errors.title, function(x) { return "Title " + x; })
		.concat(
			_.map(errors.url, function(x) { return "Url " + x; })
		);
};

Template.addFail.problemWithTitle = function(){
	var errors = Session.get("errorAddingFail");
	return errors !== null && errors.title.length > 0;
};

Template.addFail.problemWithUrl = function(){
	var errors = Session.get("errorAddingFail");
	return errors !== null && errors.url.length > 0;
};

