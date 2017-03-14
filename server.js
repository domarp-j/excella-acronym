//
// Call packages
//
var express = require('express');
var bodyParser = require('body-parser');

//
// Configure app to use bodyParser()
//
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json()):

//
// Set port
//
var port = process.env.port || 8080;
