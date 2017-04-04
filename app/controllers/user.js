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
// GET Index
//
exports.index = (request, response) => {
  User.find((error, users) => {
    if (error) response.send(error);

    response.json({
      message: 'Success! Here are all of the users currently in the database.',
      count: users.length,
      users: appHelper.stripAll(users, ['email'])
    });
  });
};

//
// POST Create
//
exports.create = (request, response) => {
  if (!request.body.email || !request.body.password) {
    response.send({
      message: 'Warning! User is not properly defined. Please check your parameters.',
      email: request.body.email || 'undefined',
      password: request.body.password ? '******' : 'undefined'
    });
  } else {
    let user = new User();

    user.email = request.body.email;
    user.password = request.body.password;

    user.save((error) => {
      if (error) response.send(error);

      response.json({
        message: 'Success! A new user has been added to the database.',
        email: request.body.email
      });
    });
  }
};
