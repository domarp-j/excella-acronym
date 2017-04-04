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
exports.create = (request, response) => {
  let user = new User();

  if (!request.body.email || !request.body.password) {
    response.send({
      message: 'Warning! User is not properly defined. Please check your parameters.',
      email: request.body.email || 'undefined',
      password: request.body.password ? 'valid' : 'undefined'
    });

    return;
  };

  user.email = request.body.email;
  user.password = request.body.password;
  user.admin = false;

  user.save((error) => {
    if (error) response.send(error);

    response.json({
      message: 'Success! A new user has been added to the database.',
      email: request.body.email
    });
  });
};
