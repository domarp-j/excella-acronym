// ====================
// Models
// ====================

var Acronym = require('../models/acronym');

// ====================
// RESTful Methods
// ====================

// Index
exports.get = function(request, response) {
  Acronym.find(function(error, acronyms) {
    if (error) response.send(error);

    response.json({
      message: 'Success! Here are all of the acronyms currently in the database.',
      acronyms
    });
  });
}

// Post
exports.post = function(request, response) {
  var acronym = new Acronym();

  if (!request.body.name || !request.body.meaning) {
    response.send({
      message: 'Warning! Acronym is not properly defined. Please check your parameters.',
      name: request.body.name || 'undefined',
      meaning: request.body.meaning || 'undefined'
    });

    return;
  }

  acronym.name = request.body.name;
  acronym.meaning = request.body.meaning;

  acronym.save(function(error) {
    if (error) response.send(error);

    response.json({
      message: 'Success! A new acronym has been added to the database.',
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
      message: 'Success! Here are all of the acronyms with the name ' + request.params.name + '.',
      acronyms
    });
  });
}
