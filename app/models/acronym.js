// ====================
// Modules
// ====================

let mongoose = require('mongoose');

// ====================
// Schema
// ====================

let Schema = mongoose.Schema;

let AcronymSchema = new Schema(
  {
    name: { type: String, required: true },
    meaning: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

// ====================
// Export
// ====================

module.exports = mongoose.model('Acronym', AcronymSchema);
