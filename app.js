var express = require('express');

var app = express();

app.use(express.static('public'));

app.get('/cities', function(req, resp) {
	var cities = ['Loopa', 'London', 'SanFran'];

	resp.json(cities);
});

module.exports = app;
