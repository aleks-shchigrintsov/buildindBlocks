var express = require('express');

var app = express();

app.get('/', function(req, resp){
	resp.send("hello world!");
});

app.listen(3000, function() {
	console.log("Server is listening on http://localhost:3000");
});
