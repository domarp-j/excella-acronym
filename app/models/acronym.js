// ====================
// Modules
// ====================

let mongoose = require('mongoose');
let appHelper = require('../helpers/app');

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

AcronymSchema.pre('save', function(next) { // can't use '=>' here!
  let acronym = this;

  if (acronym.isModified('name') || acronym.isNew()) {
    acronym.name = acronym.name.toUpperCase();
  }

  if (acronym.isModified('meaning') || acronym.isNew()) {
    acronym.meaning = appHelper.capitalize(acronym.meaning);
  }

  next();
});

// ====================
// Export
// ====================

module.exports = mongoose.model('Acronym', AcronymSchema);
