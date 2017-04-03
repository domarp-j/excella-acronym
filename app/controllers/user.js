// ====================
// Models
// ====================

let User = require('../models/user');

// ====================
// RESTful Methods
// ====================

//
// GET Index
//
// exports.index = (request, response) => {
//   User.find((error, users) => {
//     if (error) response.send(error);
//
//     response.json({
//       message: 'Success! Here are all of the registed Excella Acronym API users.',
//       count: users.length,
//       acronyms: users
//     });
//   });
// };
