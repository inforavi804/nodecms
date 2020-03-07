import express from 'express';
var app 	= express();
var route 	= express.Router();


console.log("route file execcuted!");

//
route.get('/', function (req, res) {
	
		console.log("route path url requested")
		res.send('GET request to the route path')
});

//
route.get('/users', function (req, res) {
	
		console.log("users path url requested")
		res.send('GET request to the users data')
});

export default route;

