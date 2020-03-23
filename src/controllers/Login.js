
import AppController from '../controllers/app';
import UserModel from '.././models/User';
import UserController from '../controllers/User';
import passport from 'passport';
import passportlocal from 'passport-local';

var user = new UserModel();
//import Logger from 'logger';
//import { verify } from 'jsonwebtoken';


class LoginController extends AppController{


	constructor(model){
        super(model);

        this.login = this.login.bind(this);
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
}


export default LoginController;