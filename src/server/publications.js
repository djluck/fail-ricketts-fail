Meteor.publish('all-fails', function () {
  return Fails.find({});
});

// Meteor.publish('user-votes', function () {
//   return Votes.find({userId : Meteor.userId()});
// });
