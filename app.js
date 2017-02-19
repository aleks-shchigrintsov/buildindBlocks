var express = require('express');

var app = express();

app.get('/', function(req, resp){
	resp.send("hello world!");
});

module.exports = app;
