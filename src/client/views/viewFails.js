Meteor.subscribe("all-fails");

Template.viewFailsMenu.events({
  "click #btn-add-fail" : function(event){
    Session.set("addingFail", true);
  }
});

Template.fail.events({
	"click .btn-vote" : function(event){
		Fails.likeFail(this._id);
	}
})

Template.fails.fails = function(){
	return Session.get("ordered");
};

Template.fails.created = function(){
	Deps.autorun(function(){
		var byMostLiked = Fails.orderedByMostLikes();
		Session.set("ordered", reorderForMasonryLayout(byMostLiked));
	});
}

var reorderForMasonryLayout = function(fails){
	var columns = 3;
	var lists = _.groupBy(fails, function(element, index){
	  return Math.floor(index/columns);
	});

	var lists = _.toArray(lists);

	console.log(lists);
	var transposed = transpose(lists);
	console.log(transposed);

	return _.flatten(transposed);
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