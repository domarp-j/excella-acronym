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
app.use(bodyParser.json());

//
// Set port using
//
var port = process.env.PORT || 8080;

//
// Set routes for API
//
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'hello world!' });
});

app.use('/', router);

app.listen(port);
