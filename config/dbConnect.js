import config from '.././config/config';
import mongoose from 'mongoose';

var uristring = config.dbURL;

//mongo connection url
//console.log("urlstring => ", uristring);

//mongo connection method declaration
const dbConnect = () => {

	// Makes connection asynchronously.  Mongoose will queue up database
	// operations and release them when the connection is complete.
	return 	mongoose.connect(uristring, function (err, res) {

		if (err) {
			console.log ('ERROR connecting to: ' + uristring + '. ' + err);
		} else {
			console.log ('Succeeded connected to: ' + uristring);
		}
	});
}

export { dbConnect };