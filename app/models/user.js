// ====================
// Modules
// ====================

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

// ====================
// Schema
// ====================

let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
);

// ====================
// Before Actions
// ====================

let saltRounds = 10;

UserSchema.pre('save', (next) => {
  let user = this;

  if (user.isModified('password') || user.isNew) {
    bcrypt.hash(user.password, saltRounds, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      console.log(hash); 
      next();
    });
  } else {
    return next();
  }
});

// ====================
// Methods
// ====================

UserSchema.methods.checkPassword = (input, done) => {
  let user = this;

  bcrypt.compare(input, user.password, (error, isMatch) => {
    if (error) return done(error);
    else done(null, isMatch);
  });
};

// ====================
// Export
// ====================

module.exports = mongoose.model('User', UserSchema);
