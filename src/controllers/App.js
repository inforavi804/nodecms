//import AppError from '.././helper/AppError';
import Url from 'url';
import User from '.././models/User';
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
		this.update  = this.update.bind(this);
		this.delete  = this.delete.bind(this);
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
    * @param {function} next The callback to the next program handler
    * @return {Object} res The response object
    */
    update(req, res, next){

		let recId = req.params.id;
		//let whereCond  = {'_id':recId};
		let reqData   = req.body;
		//let valueUpdate = {$set: {"name":"Sriram"}}; //{$set: req.body};
		//let valueUpdate = _.assign({ "updatedAt": new Date() }, obj);
		//const validator = this._model.validateCreate(obj);

		console.log("outer section executing");

		//if (validator.passes() || true) {
		if (true) {

			console.log("If block section executing");
			//let userModelObj = this._model(reqData);
			console.log("+------------------+");
			console.log(req.params, req.body);

			User.updateMany({_id:req.params.id}, 
				//{$set:{username:req.body.username, age:req.body.age}},
				{$set:req.body},
				{new:true}).then((res)=>{
					if(res) {
						 res.send(res);
					     //resolve({success:true, data:res});
					} else {
						 res.send(res);
					     //reject({success:false, data:"no such user exist"});
					}
				}, (err) => {
					console.log ('Error on save!', err);
					return next(err);
		        });
	        
		} else {

			console.log("Else block section executing");

			console.log("Validation error ocurred", validator.errors.all());
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
	getList(req, res, next){
		let userModelObj = this._model;
		userModelObj.find({}).exec(function(err, result) {
			if (!err) {
				res.send(result);
			} else {
				throw err;
				//res.send("Error ocurred on performing updaet operation", err);
			};
		}); 
	}

	/**
    * @param {Object} req The request object
    * @param {Object} res The response object
    */
    delete(req, res, next){
		var recId = req.params.id;
		//var query = req.query;
		console.log("Id to delete item => ", recId);
		let userModelObj = this._model;
		userModelObj.find({'_id':recId}).remove().exec(function(err, result) {
			if (!err) {
				res.send(result);
			} else {
				// error handling
			};
		}); 
	}
}

export default AppController;