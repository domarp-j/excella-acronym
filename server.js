// ====================
// Third-Party Modules
// ====================

let express = require('express');
let bodyParser = require('body-parser');

require('dotenv-safe').load();
require('newrelic');

// ====================
// Internal Modules
// ====================

//
// Database
//
let db = require('./app/database/connection');

//
// Models
//
let Acronym = require('./app/models/acronym');
let User = require('./app/models/user');

//
// Controllers
//
let AcronymController = require('./app/controllers/acronym');
let AuthController = require('./app/controllers/auth');
let SlackController = require('./app/controllers/slack');
// let UserController = require('./app/controllers/user');

// ====================
// App Setup
// ====================

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT;

// ====================
// Routing
// ====================

let router = express.Router();

//
// Base Route
//
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Excella Acronyms API! Please see the link below for details on how the API works.',
    link: 'https://github.com/domarp-j/excella-acronym-api'
  });
});

//
// API Routes
//
router.route('/acronyms')
  .get(AcronymController.getAll)
  .post(AuthController.bouncer, AcronymController.add)
  .delete(AuthController.bouncer, AcronymController.remove);
router.route('/acronyms/:name')
  .get(AcronymController.get);
router.route('/auth')
  .post(AuthController.authenticate);
router.route('/slack')
  .post(SlackController.handle);
// router.route('/users')
  // .post(UserController.add);

// ====================
// Register Routes
// ====================

app.use('/', router);

// ====================
// Run Server
// ====================

app.listen(port, () => {
  console.log(`The API is currently running on localhost: ${port}.` );
});
