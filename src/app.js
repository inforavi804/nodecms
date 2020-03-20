import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '.././config/config';
import {dbConnect} from '.././config/dbConnect';
import route from  '.././src/api/route';
import passport from 'passport';

//import Logger from './loaders/logger';

var app = express();


async function startServer() {

	// support json encoded bodies
	app.use(express.json());
	// support json encoded bodies
	app.use(bodyParser.urlencoded({extended: true}));
	//cross origin request handles
	app.use(cors())

	//using passport authntication moddleware
	app.use(passport.initialize());
	app.use(passport.session());
	//including routes here
	app.use(route);

	//calling method to connect with mongodb
	dbConnect().then(async () => {

		app.listen(config.port, err=>{

			if (err) {

				//Logger.error(err);
				console.log(err);
	      		process.exit(1);
	      		return;
			}

			console.log(`
	    		+----------------------------------------------+
	    		+   Server listening on port: ${config.port}   +
	    		+----------------------------------------------+
			`);
		});
	});
	
}

//method calling to start server
startServer();