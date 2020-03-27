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
var user = new UserModel();
Auth.init(app);




//Router to display main file
route.get('/',  userCtrl.index);
route.post('/login', loginCtrl.login);

//Router to perform operation on users
route.get('/users',  userCtrl.getList);
route.post('/user/add', loginCtrl.register);
route.post('/user/update/:id', userCtrl.update);
route.delete('/user/delete/:id', userCtrl.delete);

export default route;

