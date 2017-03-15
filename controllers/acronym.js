// ====================
// Models
// ====================

var Acronym = require('../models/acronym');

// ====================
// Helpers
// ====================

var acronymHelper = require('../helpers/acronym');

// ====================
// RESTful Methods
// ====================

// Index
exports.get = function(request, response) {
  Acronym.find(function(error, acronyms) {
    if (error) response.send(error);

    response.json({
      message: 'Success! Here are all of the Excella acronyms currently in the database.',
      acronyms: acronymHelper.stripId(acronyms)
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

  acronym.name = request.body.name.toUpperCase();
  acronym.meaning = acronymHelper.capitalize(request.body.meaning);

  acronym.save(function(error) {
    if (error) response.send(error);

    response.json({
      message: 'Success! A new Excella acronym has been added to the database.',
      acronym: {
        name: acronym.name,
        meaning: acronym.meaning
      }
    });
  });
}

// Show
exports.show = function(request, response) {
  name = request.params.name.toUpperCase();

  Acronym.find({ name: name }, function(error, acronyms) {
    if (error) response.send(error);

    response.json({
      message: 'Success! Here are all of the Excella acronym meanings for ' + name + '.',
      acronyms: acronymHelper.stripId(acronyms)
    });
  });
}
