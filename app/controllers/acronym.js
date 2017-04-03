// ====================
// Models
// ====================

let Acronym = require('../models/acronym');

// ====================
// Helpers
// ====================

let acronymHelper = require('../helpers/acronym');

// ====================
// RESTful Methods
// ====================

//
// GET Index
//
exports.index = (request, response) => {
  Acronym.find((error, acronyms) => {
    if (error) response.send(error);

    response.json({
      message: 'Success! Here are all of the Excella acronyms currently in the database.',
      count: acronyms.length,
      acronyms: acronymHelper.stripAll(acronyms)
    });
  });
};

//
// POST Create
//
exports.create = (request, response) => {
  let acronym = new Acronym();

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

  acronym.save((error) => {
    if (error) response.send(error);

    response.json({
      message: 'Success! A new Excella acronym has been added to the database.',
      acronym: acronymHelper.strip(acronym)
    });
  });
};

//
// GET Show
//
exports.show = (request, response) => {
  let name = request.params.name.toUpperCase();

  Acronym.find({ name: name }, (error, acronyms) => {
    if (error) response.send(error);

    response.json({
      message: `Success! Here are all of the Excella acronym meanings for ${name}`,
      count: acronyms.length,
      acronyms: acronymHelper.stripAll(acronyms)
    });
  });
};
