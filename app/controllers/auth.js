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
    res.json({
      success: false,
      message: 'Authentication is not properly defined. Please ensure that "email" & "password" parameters are present.',
      email: req.body.email || '(undefined)',
      password: req.body.password ? '(defined)' : '(undefined)'
    });
  } else {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.json({
          success: false,
          message: err
        });
      } else if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User was not found.'
        });
      } else {
        user.checkPassword(req.body.password, (err, isMatch) => {
          if (err) {
            res.json({
              success: false,
              message: err
            });
          } else if (!isMatch) {
            res.json({
              success: false,
              message: 'Authentication failed. Password was incorrect.'
            });
          } else {
            let token = jwt.sign(user, process.env.JWT_SECRET, { algorithm: 'HS256' });
            res.json({
              success: true,
              email: user.email,
              token: `${token}`
            });
          }
        });
      }
    });
  }
};
