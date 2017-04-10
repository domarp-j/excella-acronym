// ====================
// Models
// ====================

let User = require('../models/user');

// ====================
// Helpers
// ====================

let appHelper = require('../helpers/app');

// ====================
// RESTful Methods
// ====================

//
// POST Create
//
exports.create = (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.passwordConfirm) {
    res.send({
      success: false,
      message: 'User is not properly defined. Please ensure that "email", "password", and "passwordConfirm" parameters are present.',
      email: req.body.email || undefined,
      password: req.body.password ? '(defined)' : undefined,
      passwordConfirm: req.body.passwordConfirm ? '(defined)' : undefined
    });
  } else if (req.body.password != req.body.passwordConfirm) {
    res.send({
      success: false,
      message: 'Password and password confirmation do not match.'
    });
  } else {
    let user = new User();

    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err) => {
      if (err) {
        res.send({
          success: false,
          message: err.errmsg
        });
      } else {
        res.send({
          success: true,
          message: 'A new user has been added to the database.',
          user: appHelper.strip(user, ['email'])
        });
      }
    });
  }
};
