// ====================
// RESTful Methods
// ====================

//
// POST Create
//
exports.create = (request, response) => {
  User.findOne({
    email: request.body.name
  }), (error, user) => {
    if (error) throw error;

    if (!user) {
      response.json({
        message: 'Warning! Authentication failed. User was not found.'
      });
    } else {

    }
  }
};
