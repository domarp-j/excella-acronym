// ====================
// Module Dependencies
// ====================

// Third-Party Modules
var express = require('express');
var bodyParser = require('body-parser');

// Database
var db = require('./app/database/connection');

// Models
var Acronym = require('./app/models/acronym');

// Controllers
var AcronymController = require('./app/controllers/acronym');

// ====================
// App Setup
// ====================

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ====================
// Routing
// ====================

var router = express.Router();

// Base Route
router.get('/', function(request, response) {
  response.json({ message: 'Welcome to the Excella Acronyms API!' });
});

// API Routes
router.route('/acronyms')
  .get(AcronymController.get)
  .post(AcronymController.post);
router.route('/acronyms/:name')
  .get(AcronymController.show);

// ====================
// Register Routes
// ====================

app.use('/', router);

// ====================
// Run Server
// ====================

app.listen(port, function() {
  console.log('The API is currently running on localhost:/' + port);
});
