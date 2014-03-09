Template.likeFail.events({
  //for every "like" button, handle the click event
  "click .add-like" : function(event){
    
    if (isFailLiked(this._id)){
      Fails.dislikeFail(this._id);
      Session.set(failLikedKey(this._id), false);
    }
    else {
      Fails.likeFail(this._id);
      Session.set(failLikedKey(this._id), true);
    }

  }
})

Template.likeFail.liked = function(){
  return isFailLiked(this._id);
}

var failLikedKey = function(id){
  return "liked_" + id;
}

var isFailLiked = function(id){
  var liked = Session.get(failLikedKey(id));
  return liked !== undefined && liked;
}
