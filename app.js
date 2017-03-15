// ====================
// Module Dependencies
// ====================

// Third-Party Modules
var express = require('express');
var bodyParser = require('body-parser');

// Database
var db = require('./database/connection');

// Models
var Acronym = require('./models/acronym');

// Controllers
var acronymsController = require('./controllers/acronym');

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
  .get(acronymsController.get)
  .post(acronymsController.post);
router.route('/acronyms/:name')
  .get(acronymsController.show);

// ====================
// Register Routes
// ====================

app.use('/', router);

// ====================
// Run Server
// ====================

app.listen(port);
