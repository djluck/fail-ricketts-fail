handleError = function(err){
	if (err){
		alert("Failed to sync");
		console.log(err);
	}
	else{
		console.log("Sync'd");
	}
};