
import AppController from '../controllers/app';
import UserModel from '../models/User';
//import UserController from '../controllers/User';
import passport from 'passport';
import passportlocal from 'passport-local';
import bcrypt from 'bcrypt';

var user = new UserModel();
//import Logger from 'logger';
//import { verify } from 'jsonwebtoken';

class LoginController extends AppController{

	constructor(model){
        super(model);

        this.register = this.register.bind(this);
        this.login    = this.login.bind(this);
    }

    /**
    * @param {Object} req The request object
    * @param {Object} res The response object
    * @param {function} next The callback to the next program handler
	*/
    login(req, res, next){

        const LocalStrategy = passportlocal.Strategy;
        var options = {
            usernameField : 'username', 
            passwordField : 'password', 
            passReqToCallback: true
        };
        
        let username = req.body.username;
        let password = req.body.password;

        console.log('Controller method worked');
        passport.authenticate('local', function(err, success, info) {    
            
            console.log(err, '+------+', success,  '+------+', info);
            if (err) {
                return res.status(401).json(err);
            }
            if (success) {
                const token = user.generateJwt();
                return res.status(200).json({
                    "token": token
                });
            } else {
                res.status(401).json(info);
            }
        })(req, res);
    }

    /**
    * @param {Object} req The request object
    * @param {Object} res The response object
    * @param {function} next The callback to the next program handler
    */
    async register(req, res, next){

        let obj = req.body;

        console.log('+------1-------+', obj.password);
        const salt = await bcrypt.genSalt(20);
        console.log('+------5-------+', salt);
        obj.password = await bcrypt.hash(obj.password, salt);
        console.log('+------10-------+', obj.password);

      	const validator = this._model.validateCreate(obj);  

      	if (validator.passes()) {

	        let object = new this._model(obj);
	        object.save().then((resObj) => {
	               //const meta = getSuccessMeta();
				   //return res.status(OK).json(formatResponse(meta, savedObject));
				   res.send(resObj);
	            }, (err) => {
					console.log ('Error on save!', err);
				    return next(err);
	            });
	    } else {
	    	//console.log(validator.errors.all());
			const appError = validator.errors.all();
			// Passing errors to Express & returning it
			//res.send(appError);
			return next(appError);
	    }
    }
}


export default LoginController;