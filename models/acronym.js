// ====================
// Module Dependencies
// ====================

var mongoose = require('mongoose');

// ====================
// Schema
// ====================

var Schema = mongoose.Schema;

var acronymSchema = new Schema({
  name: { type: String, required: true },
  meaning: { type: String, required: true },
}, { timestamps: true });

// ====================
// Export
// ====================

module.exports = mongoose.model('Acronym', acronymSchema)
