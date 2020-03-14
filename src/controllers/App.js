//import AppError from '.././helper/AppError';
import CONSTANT from '.././constants/constants';

class AppController{

	/**
    * @param {Model} model The default model object
    * for the controller. Will be required to create
    * an instance of the controller
    */
   constructor(model){
		this._model  = model;
		//this.index   = this.index.bind(this);
		this.create  = this.create.bind(this);
		this.getList = this.getList.bind(this);
	}

	/**
    * @param {Object} req The request object
    * @param {Object} res The response object
    * @param {function} next The callback to the next program handler
	*/

	index(req, res) {
		res.send("+------------ Request to the main route path ----------------+");
	}

	/**
    * @param {Object} req The request object
    * @param {Object} res The response object
    * @param {function} next The callback to the next program handler
    * @return {Object} res The response object
    */
	create(req, res, next){

		let obj = req.body;
      	const validator = this._model.validateCreate(obj);

      	if (validator.passes()) {

	        let object = new this._model(obj);
	        object.save()
	            .then((savedObject) => {
	               //const meta = getSuccessMeta();
				   //return res.status(OK).json(formatResponse(meta, savedObject));
				   res.send(object);
	            }, (err) => {
					console.log ('Error on save!', err);
				    return next(err);
	            });
	    } else {
	    	console.log(validator.errors.all());
			//const appError = new AppError(CONSTANT.ERROR_TYPE, CONSTANT.BAD_REQUEST, validator.errors.all());
			const appError = validator.errors.all();
			// Passing errors to Express & returning it
			res.send(appError);
			//return next(appError);
	    }
	}

	/**
    * @param {Object} req The request object
    * @param {Object} res The response object
    */
	getList(req, res){
		let userModelObj = this._model;
		userModelObj.find({}).exec(function(err, result) {
			if (!err) {
				res.send(result);
			} else {
				// error handling
			};
		}); 
	}

}

export default AppController;