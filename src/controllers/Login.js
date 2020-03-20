import AppController from '../controllers/app';
import User from '.././models/User';
import UserController from '../controllers/User';
import passport from 'passport';
import LocalStrategy from 'passport-local';

//var LocalStrategy = passportlocal.Strategy;

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
        let username = req.body.username;
        let password = req.body.password;

        //passport.authenticate('local', { failureRedirect: '/login' }),
        console.log(username, '+------- Outer -------+', password);
        passport.use(new LocalStrategy(function(username, password, done) {

                console.log(username, '+------- Inner -------+', password);
                User.findOne({ username: username }, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    if (!user.verifyPassword(password)) { 
                        return done(null, false); 
                    }
                    return done(null, user);
                });
            }
        ));
    }
    

}


export default LoginController;