import AppController from '../controllers/app';


class UserController extends AppController{


	constructor(model){
		super(model);
		//this.getList = this.getList.bind(this);
	}


	// getList = function(req, res) {
	// 	User.find({}).exec(function(err, result) {
	// 		if (!err) {
	// 			res.send(result);
	// 		} else {
	// 			// error handling
	// 		};
	// 	});
	// 	console.log("route path url requested")
	// }

	// create(req, res, next) {
	// 	return res.status(200).json('i have been overridden');
	// }

}


export default UserController;