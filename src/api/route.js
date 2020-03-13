import express from 'express';
import UserModel from '../models/User';
import bodyParser from 'body-parser';

// Require controller modules.
import AppController from '../controllers/App';
import UserController from '../controllers/User';

const userCtrl = new UserController(UserModel);
var app 	= express();
var route 	= express.Router();


//Router to display main file
route.get('/',  userCtrl.index);

//Router to perform operation on users
route.get('/users',  userCtrl.getList);
route.post('/adduser', userCtrl.create);

export default route;

