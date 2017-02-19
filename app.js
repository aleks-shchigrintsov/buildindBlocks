var express = require('express');
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});

var app = express();

app.use(express.static('public'));

var cities = {
	'Loopa': 'description loopa',
  'London': 'some new descr',
	'SanFran': 'sanFran description'
};

app.get('/cities', function(req, resp) {
	resp.json(Object.keys(cities));
});

app.post('/cities', urlencode, function(req, resp) {
	var newCity = req.body;

	cities[newCity.name] = newCity.description;

	resp.status(201).json(newCity.name);
});

module.exports = app;
