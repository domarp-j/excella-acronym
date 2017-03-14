// ====================
// Modules
// ====================
var mongoose = require('mongoose');
var Acronym = require('./models/acronym');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myproject')
