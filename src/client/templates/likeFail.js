Meteor.subscribe("user-likes");

Template.likeFail.events({
  //for every "like" button, handle the click event
  "click .add-like" : function(event){

    //'this' refers to the data context the template is bound to. In this case, it will be a Fail.
    var id = this._id; 

    if (isFailLiked(id)){
      Fails.dislikeFail(id);
      Likes.dislikeFail(id);
    }
    else {
      Fails.likeFail(id);
      Likes.likeFail(id);
    }

  }
});

Template.likeFail.liked = function(){
  return isFailLiked(this._id);
};

var isFailLiked = function(id){
  return Likes.isFailLiked(id);
};
