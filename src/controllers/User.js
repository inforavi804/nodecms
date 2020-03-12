import AppController from '../controllers/app';


class UserController extends AppController{


	constructure(model){
		super(model);

	}


	var getList = function(req, res) {

			User.find({}).exec(function(err, result) {
				if (!err) {
					res.send(result);
				} else {
					// error handling
				};
		    }); 
			console.log("route path url requested")
		}

}


export default UserController;