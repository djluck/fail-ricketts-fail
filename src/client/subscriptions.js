//Controlls the data we receive from the server, which are then used to populate our client-based DB copy.
//We can only query (on the client) over the data we have subscribed to
Meteor.subscribe("all-fails");
Meteor.subscribe("user-likes");