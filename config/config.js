import dotenv from 'dotenv';

//set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//declaring a constant with the env configuration
const envFound = dotenv.config();


export default{

	port: parseInt(process.env.PORT, 10),
	dbURL: process.env.MONGODB_URI,
	logs: {
	    level: process.env.LOG_LEVEL || 'zero'
	},
	api: {
    	prefix: '/api'
  	},
  	emails: {
    	apiKey: 'API key from mailing API',
    	domain: 'Domain Name from mailing API'
  	}
	
}
