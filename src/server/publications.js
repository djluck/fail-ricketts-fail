Meteor.publish('all-fails', function () {
  return Fails.find({});
});
