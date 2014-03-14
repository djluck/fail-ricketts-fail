Template.viewFailsMenu.events({
  "click #btn-add-fail" : function(event){
      Session.set("addingFail", true);
  },
  "click .sort-options a" : function(event){
      Session.set("orderedBy", this);
  }
});

Template.viewFailsMenu.sortOptions = [
    //The sortBy field declare MongoDB sort selectors
    { name : "New to Old", sortBy : { dateCreated : -1 }},
    { name : "Old to New", sortBy : { dateCreated : 1 }},
    { name : "Most liked", sortBy : { votes : -1 }},
    { name : "Least liked", sortBy : { votes : 1 }}
];

Template.viewFailsMenu.isSelected = function(){
    Session.setDefault("orderedBy", Template.viewFailsMenu.sortOptions[0]);
    return Session.get("orderedBy").name === this.name;
}


Template.fails.fails = function(){
    //when the value of the "orderBy" session variable changes, this will re-run the Fails.orderFailBy() query
    var orderBy = Session.get("orderedBy").sortBy;

    //when the Fails.orderBy() query is re-run, return value of this function will change and the fails Template will re-render
    var sortedFails = Fails.orderFailsBy(orderBy);

    return reorderForMasonryLayout(sortedFails);
};


Template.likeFail.events({
  //for every "like" button, handle the click event
  "click .add-like" : function(event){

    //'this' refers to the data context the template is bound to. In this case, it will be a Fail.
    var id = this._id; 

    if (Likes.isFailLiked(id)){
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
    return Likes.isFailLiked(this._id);
};





/*
* As we render each fail as an inline element and use CSS columns to render the fails, we loose the order of the fails. 
* Consider the list : [1, 2, 3, 4, 5, 6]. Using 3 CSS columns, this would be rendered on the page as:

-------------
| 1 | 3 | 5 |
| 2 | 4 | 6 |
-------------

In order to allow the user to read left to right as they would normally do, if we transpose the array, it will be layed out like so:

-------------
| 1 | 2 | 3 |
| 4 | 5 | 6 |
-------------

*/
var reorderForMasonryLayout = function(fails){
	var columns = 3;
	var lists = _.groupBy(fails, function(element, index){
	  return Math.floor(index/columns);
	});

	var lists = _.toArray(lists);
	var transposed = transpose(lists);

	return _.filter(_.flatten(transposed), function(x) { return x !== undefined; });
};

var transpose = function(a) {

  // Calculate the width and height of the Array
  var
    w = a.length ? a.length : 0,
    h = a[0] instanceof Array ? a[0].length : 0;

  // In case it is a zero matrix, no transpose routine needed.
  if(h === 0 || w === 0) { return []; }

  /**
   * @var {Number} i Counter
   * @var {Number} j Counter
   * @var {Array} t Transposed data is stored in this array.
   */
  var i, j, t = [];

  // Loop through every item in the outer array (height)
  for(i=0; i<h; i++) {

    // Insert a new row (array)
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for(j=0; j<w; j++) {

      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }

  return t;
};
