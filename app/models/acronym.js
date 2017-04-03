// ====================
// Modules
// ====================

let mongoose = require('mongoose');
let acronymHelper = require('../helpers/acronym');

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
// Before Actions
// ====================

AcronymSchema.pre('save', function(next) {
  let acronym = this;

  if (acronym.isModified('meaning') || acronym.isNew()) {
    acronym.meaning = acronymHelper.capitalize(acronym.meaning);
    next();
  } else {
    return next();
  };
});

// ====================
// Export
// ====================

module.exports = mongoose.model('Acronym', AcronymSchema);
