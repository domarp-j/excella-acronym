// ====================
// Third-Party Modules
// ====================

let express = require('express');
let bodyParser = require('body-parser');

require('dotenv-safe').load();

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

//
// Controllers
//
let AcronymController = require('./app/controllers/acronym');

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
router.get('/', (request, response) => {
  response.json({ message: 'Welcome to the Excella Acronyms API!' });
});

//
// API Routes
//
router.route('/acronyms')
  .get(AcronymController.index)
  .post(AcronymController.create);
router.route('/acronyms/:name')
  .get(AcronymController.show);

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
