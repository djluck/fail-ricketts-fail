Fails = new Meteor.Collection("fails");

Fails.addFail = function(title, url){
	var errors = validateFail(title, url);

	if (errors.hasErrors())
		throw errors;

	var toInsert = {
		title : title,
		url : url,
		dateCreated : new Date(),
		votes : 0
	};
	Fails.insert(toInsert, handleError);
};

Fails.likeFail = function(id){
	updateVotes(id, +1);
};

Fails.dislikeFail = function(id){
	updateVotes(id, -1);
};

Fails.orderedByMostLikes = function(){
	return sortFailsBy({votes : -1});
};

Fails.orderedByLeastLikes = function(){
	return sortFailsBy({votes : 1});
};

var sortFailsBy = function(sortSpecifier){
	return Fails.find({}, {sort: sortSpecifier}).fetch();
};

var validateFail = function(title, url){
	var validationErrors = {
		title : [], 
		url : [], 
		hasErrors : function(){ return this.title.length + this.url.length > 0; }
	};

	if (typeof title !== "string")
		validationErrors.title.push("must be a string");

	if (title.length <= 5)
		validationErrors.title.push("must be longer than 5 characters");

	if (typeof url !== "string")
		validationErrors.url.push("must be a string");

	if (!(/^http[s]?:\/\/.+/.test(url)))
		validationErrors.url.push("must be a url");

	if (Fails.findOne({url : url}) !== undefined)
		validationErrors.url.push("already exists as a fail");

	return validationErrors;
}

var updateVotes = function(id, changeBy){
	var update = {
		$inc :{
			votes : changeBy
		}
	};
	Fails.update(id, update, handleError);
};

var handleError = function(err){
	if (err){
		alert("Failed to sync");
		console.log(err);
	}
	else{
		console.log("Sync'd");
	}
};
