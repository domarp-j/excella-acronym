// ====================
// Modules
// ====================

let mongoose = require('mongoose');

// ====================
// Schema
// ====================

let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true
  }
);
