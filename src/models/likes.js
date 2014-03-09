//Declare a new MongoDB collection called "likes". 
//By ommitting the "var" keyword, we are declaring the Likes variable to be global in scope.
Likes = new Meteor.Collection("likes");

//declaring helper methods on the Likes collection to make liking/disliking a bit neater

Likes.likeFail = function(failId){
	var toInsert = {
		failId : failId, //the id of the fail to like
		userId : Meteor.userId() //the id of the user who liked a fail
	};

	Fails.insert(toInsert, handleError); //insert the fail and handle any errors asynchronously
};

Likes.isFailLiked = function(failId){
	//MongoDB uses "selectors" to locate items.
	var isLikedSelector = { 
		failId : failId, 
		userId : Meteor.userId() 
	};

	return Fails.findOne(isLikedSelector) !== null; //Query synchronously
}

Likes.dislikeFail = function(failId){
	var toRemove = { 
		failId : failId, 
		userId : Meteor.userId() 
	};

	Fails.remove(toRemove, handleError); //remove the previously liked fail and handle any errors asynchronously
}