//Publications control what data individual users can see.
//This gives the server ability to restrict users from seeing sensitive/ irrelevant data.

//publishes all fails to every user
Meteor.publish('all-fails', function () {
  	return Fails.find({});
});

//publishes each authenticated user's likes. 
//When a user logs in or out, this function will automatically be re-run and the published set of documents will change.
Meteor.publish('user-likes', function(){
	var selector = {
		userId : this.userId
	};

	return Likes.find(selector);
})
