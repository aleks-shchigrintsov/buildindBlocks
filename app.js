var express = require('express');
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});

var app = express();

app.use(express.static('public'));

//Redis connection
var redis = require('redis');
if (process.env.REDISTOGO_URL) {

	var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);

} else {
    var client = redis.createClient();
		client.select((process.env.NODE_ENV || 'development').length);
}
//end Redis connection

app.get('/cities', function(req, resp) {
	client.hkeys('cities', function(error, names) {
		if(error) throw error;

		resp.json(names);
	});
});

app.post('/cities', urlencode, function(req, resp) {
	var newCity = req.body;
	client.hset('cities', newCity.name, newCity.description, function(error) {
		if (error) throw error;

		resp.status(201).json(newCity.name);
	});
});

app.delete('/cities/:name', function(req, resp) {
	client.hdel('cities', req.params.name, function(error) {
		if (error) throw error;
		resp.sendStatus(204);
	})
});

module.exports = app;
