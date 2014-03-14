//Raised every time an account is to be created
Accounts.onCreateUser(function(options, user) {
	//assert that the proposed email address(es) belong to a DDG user
	if (!_.every(user.emails, isDdgEmail)){
		throw "Was not a DDG email address";
	}	

	return user;
});

var isDdgEmail = function(email){
	return /@dot(digitalgroup|survey|mailer).+$/.test(email.address);
}

//Permit registered users to add new fails and modify fails
Fails.allow({
	insert : function(userId, doc) { return allowRegisteredUser(userId, doc); },
	update : function(userId, doc) { return allowRegisteredUser(userId, doc); }
});

//Permit registered users to add/remove likes but only for themselves
Likes.allow({
	insert : function(userId, doc) { return allowIfIsUsersData(userId, doc); },
	remove : function(userId, doc) { return allowIfIsUsersData(userId, doc); }
});


var allowRegisteredUser = function (userId, doc) { 
	return userId !== null; 
}

var allowIfIsUsersData = function (userId, doc) {
	return allowRegisteredUser(userId, doc) && doc.userId === userId; 
}