// ====================
// Models
// ====================

let Acronym = require('../models/acronym');

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
  Acronym.find((error, acronyms) => {
    if (error) response.send(error);

    response.json({
      success: true,
      message: 'Here are all of the Excella acronyms currently in the database.',
      count: acronyms.length,
      acronyms: appHelper.stripAll(acronyms, ['name', 'meaning'])
    });
  });
};

//
// POST Create
//
exports.create = (request, response) => {
  if (!request.body.name || !request.body.meaning) {
    response.send({
      success: false,
      message: 'Acronym is not properly defined. Please ensure that "name" & "meaning" parameters are valid.',
      name: request.body.name || 'undefined',
      meaning: request.body.meaning || 'undefined'
    });
  } else {
    let acronym = new Acronym();

    acronym.name = request.body.name;
    acronym.meaning = request.body.meaning;

    acronym.save((error) => {
      if (error) response.send(error);

      response.json({
        success: true,
        message: 'A new Excella acronym has been added to the database.',
        acronym: appHelper.strip(acronym, ['name', 'meaning'])
      });
    });
  }
};

//
// GET Show
//
exports.show = (request, response) => {
  let name = request.params.name.toUpperCase();

  Acronym.find({ name: name }, (error, acronyms) => {
    if (error) response.send(error);

    response.json({
      success: true,
      message: `Here are all of the Excella acronym meanings for ${name}`,
      count: acronyms.length,
      acronyms: appHelper.stripAll(acronyms, ['name', 'meaning'])
    });
  });
};
