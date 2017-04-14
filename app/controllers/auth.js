// ====================
// Modules
// ====================

let jwt = require('jsonwebtoken');

// ====================
// Models
// ====================

let User = require('../models/user');

// ====================
// Helpers
// ====================

let appHelper = require('../helpers/app');
let slackHelper = require('../helpers/slack');

// ====================
// RESTful Methods
// ====================

//
// Authenticate user
//
exports.authenticate = (req, res) => {
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

//
// Check for token
// TODO: requires testing
//
exports.bouncer = (req, res, next) => {
  let token = appHelper.getToken(req);

  if (token) {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    User.findOne({ email: decoded._doc.email }, (err, user) => {
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
      } else return next();
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'Authentication failed. No token provided.'
    });
  }
};
