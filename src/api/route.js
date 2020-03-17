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
route.post('/user/add', userCtrl.create);
route.post('/user/update/:id', userCtrl.update);
route.delete('/user/delete/:id', userCtrl.delete);


export default route;

