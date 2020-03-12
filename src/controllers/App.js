
class AppController{

	/**
    * @param {Model} model The default model object
    * for the controller. Will be required to create
    * an instance of the controller
    */
   constructor(model){
		this._model  = model;
		this.index   = this.index.bind(this);
		this.create  = this.create.bind(this);
		this.getList = this.getList.bind(this);
	}

	index(req, res){
		res.send('Request to the main file', res);
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
				   //return next(err);
				   console.log ('Error on save!', err);
	            });
	    } else {
			/*const appError = new AppError('input errors', BAD_REQUEST, validator.errors.all());
			return next(appError);*/
	    }
	}

	/**
    * @param {Object} req The request object
    * @param {Object} res The response object
    */
	getList(req, res){
		let modelObj = this._model;
		modelObj.find({}).exec(function(err, result) {
			if (!err) {
				res.send(result);
			} else {
				// error handling
			};
		}); 
	}

}

export default AppController;