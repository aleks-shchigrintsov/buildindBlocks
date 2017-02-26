var express = require('express');
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});

var router = express.Router();

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



router.route('/')
    .get(function(req, resp) {
    	client.hkeys('cities', function(error, names) {
    		if(error) throw error;

    		resp.json(names);
    	});
    })
    .post(urlencode, function(req, resp) {
    	var newCity = req.body;

    	if (!newCity.name || !newCity.description) {
    		resp.sendStatus(400);
    		return false;
    	}

    	client.hset('cities', newCity.name, newCity.description, function(error) {
    		if (error) throw error;

    		resp.status(201).json(newCity.name);
    	});
    });

router.route('/:name')
    .delete(function(req, resp) {
    	client.hdel('cities', req.params.name, function(error) {
    		if (error) throw error;
    		resp.sendStatus(204);
    	});
    })

    .get(function(req, resp) {
    	client.hget('cities', req.params.name, function(error, description) {
    		if (error) throw error;

    		resp.render('show.ejs',
    								{
    									city: { name: req.params.name, description: description }
    								});

    		// resp.status(200).json(description);
    	});
    });

module.exports = router;
