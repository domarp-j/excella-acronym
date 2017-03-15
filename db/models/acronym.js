// ====================
// Modules
// ====================
var mongoose = require('mongoose');

// ====================
// Schema
// ====================
var Schema = mongoose.Schema;

var AcronymSchema = new Schema({
  name: { type: String, required: true },
  meaning: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Acronym', AcronymSchema);
