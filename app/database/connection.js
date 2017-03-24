// ====================
// Modules
// ====================

let mongoose = require('mongoose');
let Acronym = require('../models/acronym');

// ====================
// Mongoose Config
// ====================

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017')

module.exports = { mongoose }
