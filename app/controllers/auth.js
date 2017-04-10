// ====================
// Modules
// ====================

let jwt = require('jsonwebtoken');

// ====================
// Models
// ====================

let User = require('../models/user');

// ====================
// RESTful Methods
// ====================

//
// POST Create
//
exports.create = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send({
      success: false,
      message: 'Authentication is not properly defined. Please ensure that "email" & "password" parameters are valid.',
      email: req.body.email || 'undefined',
      password: req.body.password ? '(defined)' : 'undefined'
    });
  } else {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.send({
          success: false,
          message: err.errmsg
        });
      } else if (!user) {
        res.send({
          success: false,
          message: 'Authentication failed. User was not found.'
        });
      } else {
        user.checkPassword(req.body.password, (err, isMatch) => {
          if (err) {
            res.send({
              success: false,
              message: err.errmsg
            });
          } else if (!isMatch) {
            res.send({
              success: false,
              message: 'Authentication failed. Incorrect password.'
            })
          } else {
            let token = jwt.sign(user, process.env.JWT_SECRET, { algorithm: 'HS256' });
            res.send({
              success: true,
              email: user.email,
              token: `JWT ${token}`
            });
          }
        });
      }
    });
  }
};
