// ====================
// Models
// ====================

var Acronym = require('../db/models/acronym');

// ====================
// RESTful Methods
// ====================

// Index
exports.get = function(request, response) {
  Acronym.find(function(error, acronyms) {
    if (error) response.send(error);

    response.json({
      message: 'Here are all of the acronyms currently in the database',
      acronyms
    });
  })
}

// Post
exports.post = function(request, response) {
  var acronym = new Acronym();

  if (!request.body.name || !request.body.meaning) {
    response.send({ message: 'Acronym is not properly defined' });
    return;
  }

  acronym.name = request.body.name;
  acronym.meaning = request.body.meaning;

  acronym.save(function(error) {
    if (error) response.send(error);

    response.json({
      message: 'Added new acronym to the database',
      acronym: {
        name: acronym.name.toUpperCase(),
        meaning: acronym.meaning.toUpperCase()
      }
    });
  });
}

// Show
exports.show = function(request, response) {
  Acronym.find({ name: request.params.name }, function(error, acronyms) {
    if (error) response.send(error);

    response.json({
      message: 'All acronyms with name ' + request.params.name,
      acronyms
    });
  });
}
