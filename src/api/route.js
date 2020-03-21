import express from 'express';
import UserModel from '../models/User';
import bodyParser from 'body-parser';
//import auth from 'auth';
import passport from 'passport';

// Require controller modules.
import AppController from '../controllers/App';
import UserController from '../controllers/User';
import LoginController from '../controllers/Login';
import Auth from '.././authentication';

const userCtrl = new UserController(UserModel);
const loginCtrl = new LoginController(UserModel);

var app 	= express();
var route 	= express.Router();
Auth.init(app);

//Router to display main file
route.get('/',  userCtrl.index);
//route.post('/login', loginCtrl.login);
route.post('/login', (req, res) => {

    console.log('+------- login requested -----------+');
    passport.authenticate('local', function (err, user, info) {    

        console.log(req.body, err, user, info);

        if (err) {
            return res.status(401).json(err);
        }
        if (user) {
            const token = user.generateJwt();
            return res.status(200).json({
                "token": token
            });
        } else {
            res.status(401).json(info);
        }
    })(req, res)
});

//Router to perform operation on users
route.get('/users',  userCtrl.getList);
route.post('/user/add', userCtrl.create);
route.post('/user/update/:id', userCtrl.update);
route.delete('/user/delete/:id', userCtrl.delete);

export default route;

