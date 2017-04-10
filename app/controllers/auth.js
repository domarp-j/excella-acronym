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
      message: 'Authorization is not properly defined. Please ensure that "email" & "password" parameters are valid.',
      email: req.body.email || 'undefined',
      password: req.body.password ? '(defined)' : 'undefined'
    });
  }
};
