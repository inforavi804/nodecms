import express from 'express';
import config from '.././config/config';
import route from  '.././src/api/route';
//import Logger from './loaders/logger';

var app = express();

async function startServer() {

	//including routes here
	app.use(route);

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
	
}

//method calling to start server
startServer();