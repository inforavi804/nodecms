import express from 'express';
import UserModel from '../models/User';
import bodyParser from 'body-parser';


// Require controller modules.
import UserController from '../controllers/User';

const userCtrl = new UserController(UserModel);


var app 	= express();
var route 	= express.Router();


//console.log("route file execcuted!");
route.get('/', function (req, res) {		
	res.send('GET request to the route data')
	console.log("route path url requested")
});


// route.post('/adduser', function (req, res) {
// 	var requestData = req.body;
// 	console.log('+--- Post request data -----+ ', requestData);

// 	var userObj = 	new User ({
// 	      					name: requestData.name,
// 	      					email: requestData.email,
// 	      					age: requestData.age,
// 	      					username: requestData.username,
// 	      					password: requestData.pswd
//     				});

//     // Saving it to the database.
//     userObj.save(function (err) {
//     	if (err){ 
//     		console.log ('Error on save!', err);
//     	}else{
//     		res.send(requestData);
//     	}
//     });
// });

//Router to perform operation on users

route.get('/users',  userCtrl.getList);
route.post('/adduser', userCtrl.create);

		/*function (req, res) {

			User.find({}).exec(function(err, result) {
				if (!err) {
					res.send(result);
				} else {
					// error handling
				};
		    }); 
			console.log("route path url requested")
		}*/


export default route;

